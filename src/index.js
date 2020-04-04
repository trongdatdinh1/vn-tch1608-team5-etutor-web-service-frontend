import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import 'bootstrap/dist/css/bootstrap.css';
// import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
// import './assets/vendor/animate/animate.css';
// import './assets/css/util.css';
// import './assets/css/main.css';
// import './assets/css/style.css';
// import './assets/css/style.css.map';


import './assets/vendor/bootstrap/css/bootstrap.css';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from './store/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
