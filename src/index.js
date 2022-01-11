import VDOM from './VDOM';
import Test from './Test';
import App from './App';
import './style.css';

VDOM.init(new App({ children: [new Test()] }), document.getElementById('app'));
