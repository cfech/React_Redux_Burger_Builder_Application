//data flow = click Button -> mapDispatchToProps -> ACTIONTYPES -> actionCreators ->  middleware(index.js) -> reducer, updates state -> component -> UI

//for ingredient manipulation -- burgerBuilder Reducer
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
export const DELETE_ORDER_STARTED = "DELETE_ORDER_STARTED"
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS"
export const DELETE_ORDER_FAILED = "DELETE_ORDER_FAILED"

//for getting one order 
export const GET_ORDER_START = "GET_ORDER_START"
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"
export const GET_ORDER_FAILED = "GET_ORDER_FAILED"

//for signing up/in
export const AUTH_START = "AUTH_START"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAILED= "AUTH_FAILED"

export const AUTH_LOGOUT = "AUTH_LOGOUT"

//for saving user info to database
export const SAVED_USER_INFO = "SAVED_USER_INFO_SUCCESS"
export const SAVED_USER_INFO_START="SAVED_USER_INFO_START"
export const SAVED_USER_INFO_FAILED="SAVED_USER_INFO_FAILED"

//for getting userInfo to be displayed on userInfo page
export const GET_USER_INFO_START = "GET_USER_INFO_START"
export const GET_USER_INFO_SUCCESS= "GET_USER_INFO_SUCCESS"
export const GET_USER_INFO_FAILED ="GET_USER_INFO_FAILED"

//for conditional redirection
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH "

//purchased state false
export const SET_PURCHASED_TO_FALSE ="SET_PURCHASED_TO_FALSE"