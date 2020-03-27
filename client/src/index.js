import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import {loadAccounts} from './actions/accountsActions';
import {loadFactory} from './actions/factoryActions';

const store = configureStore();

store.dispatch(loadAccounts());
store.dispatch(loadFactory());

window.ethereum.on('accountsChanged', () => {
  store.dispatch(loadAccounts());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
