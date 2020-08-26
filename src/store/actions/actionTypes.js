//data flow = click Button -> mapDispatchToProps -> ACTIONTYPES -> actionCreators ->  middleware(index.js) -> reducer, updates state -> component -> UI

//for ingredent minipulation -- burgerBuilder Reducer
export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"
export const SET_INGREDIENTS = "SET_INGREDIENTS"
export const FETCH_ING_FAILED = "FETCH_ING_FAILED"


//for setting orders, order reducer
export const ORDER_SUCCESS = "ORDER_SUCCESS"
export const ORDER_FAILURE = "ORDER_FAILURE"
export const ORDER_BURGER_START = "ORDER_BURGER_START"
export const PURCHASE_INIT = "PURCHASE_INIT"

//for retrieving orders 

export const FETCH_ORDERS_START = "FETCH_ORDERS_START"
export const FETCH_ORDERS_SUCCESS ="FETCH_ORDERS_SUCCESS"
export const FETCH_ORDERS_FAILED = "FETCH_ORDERS_FAILED"

//for deleting orders 
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"

//for signing up/in
export const AUTH_START = "AUTH_START"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAILED= "AUTH_FAILED"