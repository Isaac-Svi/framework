class VDOM {
    static DOM = '';
    static entryPt = null;
    static mainComponent = null;

    static init(component, entryPt) {
        VDOM.makeStateReactive(component);

        (function setupChildren(comp = component) {
            if (!comp.props.children) return;

            for (const child of comp.props.children) {
                VDOM.makeStateReactive(child);
                setupChildren(child);
            }
        })();

        component.$el = entryPt;
        VDOM.render(component);
    }

    static makeStateReactive(component) {
        const state = { ...component.state };

        for (const property in state) {
            Object.defineProperty(component.state, property, {
                get() {
                    return state[property];
                },
                set(newVal) {
                    state[property] = newVal;
                    VDOM.render(component);
                },
            });
        }
    }

    static constructHTML(component) {
        let wrapper = document.createElement('template');
        wrapper.innerHTML = component.render();
        wrapper = wrapper.content.children[0];

        // setup events
        [...new Set(wrapper.attributes)]
            .filter((e) => e.name.startsWith('@'))
            .forEach((event) => {
                const [name, ...qualifiers] = event.name
                    .replace('@', '')
                    .split('.');

                const qualifierMap = {
                    stop: 'stopPropagation',
                    prevent: 'preventDefault',
                };

                const cb = new Function(event.value);
                wrapper['on' + name] = (e) => {
                    for (const q of qualifiers) {
                        const qualifyingFunction = qualifierMap[q];
                        e[qualifyingFunction]();
                    }
                    cb.bind(component)();
                };
            });

        // setup children
        if (component.props.children) {
            for (const child of component.props.children) {
                console.log(child);
                child.$el = wrapper;
                const el = VDOM.constructHTML(child);
                child.$el.append(el);
            }
        }

        return wrapper;
    }

    static render(component) {
        const el = VDOM.constructHTML(component);

        for (const child of component.$el.children) {
            child.remove();
        }

        component.$el.append(el);
    }
}

export default VDOM;
