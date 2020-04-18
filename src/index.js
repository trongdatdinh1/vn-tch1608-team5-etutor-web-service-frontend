import React from 'react';
import ReactDOM from 'react-dom';
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
