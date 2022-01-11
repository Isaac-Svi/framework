import Component from './Component';

export default class App extends Component {
    state = {
        a: 1,
        b: 2,
    };

    constructor(props) {
        super(props);

        // setTimeout(() => {
        //     this.state.a = 5;
        // }, 1000);
    }

    decrement() {
        this.state.a--;
    }

    render() {
        return `
            <div class="howdy" id="yo" @click.stop="this.decrement()">${this.state.a}</div>
        `;
    }
}
