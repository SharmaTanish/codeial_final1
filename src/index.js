import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import {configureStore} from './store'; // automatically means './store/index.js'

const store = configureStore();
// console.log(store);
console.log(store.getState());





ReactDOM.render(
  <React.StrictMode>
  <Provider store={store} >  {/* WE HAVE TO PASS PROVIDER , SINCE CONNECT WILL GET STORE FROM THIS ONLY */} 
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
 


