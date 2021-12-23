import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers'  // automaticlly find index.js file

let store;

export function configureStore(){
    store=createStore(reducer,applyMiddleware(thunk,logger));
    // store=createStore(combineReducers({posts,users}),applyMiddleware(thunk));
    
    return store;
} 
