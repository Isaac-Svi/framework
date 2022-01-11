import Component from './Component';

export default class Test extends Component {
    state = {
        greeting: 'asdf',
    };

    constructor(props) {
        super(props);
    }

    hi() {
        this.state.greeting = 'hi';
    }

    bye() {
        this.state.greeting = 'bye';
    }

    sayGreeting() {
        window.alert(this.state.greeting);
    }

    render() {
        return `
            <div 
                @click.stop="this.sayGreeting()" 
                @mouseleave.stop="this.hi()" 
                @mouseover.stop="this.bye()"
            >
                ${this.state.greeting}
            </div>
        `;
    }
}
