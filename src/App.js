import Component from './Component';

export default class App extends Component {
    state = {
        a: 1,
        b: 2,
    };

    constructor(props) {
        super(props);
    }

    decrement() {
        this.state.a--;
    }

    increment() {
        this.state.a++;
    }

    render() {
        return `
            <div class="howdy" id="yo">
                <button @click.stop="this.decrement()">-</button>
                <button @click.stop="this.increment()">+</button>
                ${this.state.a}
            </div>
        `;
    }
}
