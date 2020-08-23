import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from "react-router-dom"

//------------Redux imports---------------------------------------------------------------------------
import burgerBuilderReducer from "./store/reducers/bugerBuilder"
import { createStore, compose, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

//------------Redux imports---------------------------------------------------------------------------

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
    <Provider store ={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
