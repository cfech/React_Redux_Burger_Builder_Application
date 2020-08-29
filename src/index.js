import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from "react-router-dom"

//------------Redux imports---------------------------------------------------------------------------
//data flow = click Button -> mapDispatchToProps -> actionTypes -> actionCreators ->  MIDDLEWARE(index.js) -> reducer, updates state -> component -> UI

import burgerBuilderReducer from "./store/reducers/burgerBuilder"
import orderReducer from "./store/reducers/order"
import authReducer from "./store/reducers/auth"
import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

//------------Redux imports---------------------------------------------------------------------------

//for redux dev tools
const composeEnhancers = process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;


//combining multiple reducers, more useful in bigger apps
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
