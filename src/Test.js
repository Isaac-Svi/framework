import Component from './Component';

export default class Test extends Component {
    state = {
        greeting: 'asdf',
    };

    constructor(props) {
        super(props);
    }

    switchGreeting() {
        this.state.greeting = this.state.greeting === 'hi' ? 'bye' : 'hi';
    }

    sayGreeting() {
        window.alert(this.state.greeting);
    }

    render() {
        return `
            <div 
                style="margin-top: 40px; border: 1px solid red; background-color: ${this.state.greeting === 'hi' ? 'white' : 'red'}"
                @click.stop="this.sayGreeting()" 
                @mouseleave.prevent="this.switchGreeting()"
            >
                ${this.state.greeting}
            </div>
        `;
    }
}
