//data flow = click Button -> mapDispatchToProps -> actionTypes -> ACTIONCREATORS ->  middleware(index.js) -> reducer, updates state -> component -> UI
import * as actionTypes from "./actionTypes"
import axios from "../../axios_orders"

//async function, dispatch made available with thunk middleware
export const initiateOrder = (order, token) => {
    return dispatch => {
        console.log(token)
        //just for setting loading to true
        dispatch(purchaseBurgerStart())

        //to post a burger to the server
        axios.post("/orders.json?auth=" + token, order)
            .then(response => {
                console.log(response)
                dispatch(orderSuccess(response.data.name, order))
            }).catch(err => {
                console.log(err)
                dispatch(orderFailure(err))
            })
    }
}


// synchronous function
export const orderSuccess = (id, orderData) => {
    return { type: actionTypes.ORDER_SUCCESS, id: id, orderData: orderData }
}


// synchronous function
export const orderFailure = (err) => {
    return {
        type: actionTypes.ORDER_FAILURE,
        error: err
    }
}

//for changing the loading state and displaying the spinner
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.ORDER_BURGER_START
    }
}

// for redirecting after order is placed, special redux method, 

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//---------------------------FOR FETCHING ORDERS---------------------

//need thunk to access dispatch
export const initFetchingOrders = (token, userId) => {
    return (dispatch, getState) => {
        //-------------IF WE JUST WANTED TO GET THAT STATE AND PASS THE TOKEN RIGHT HERE---------------------
        // const state = getState()
        // console.log("initFetchingOrders -> token", state)
        // const token = state.auth.token
        // console.log("initFetchingOrders -> token", token)
        //-------------IF WE JUST WANTED TO GET THAT STATE AND PASS THE TOKEN RIGHT HERE---------------------
        // axios.get('/orders.json?auth=' + token)

        //to set loading state
        dispatch(fetchOrderStart())

        //HOW WOULD YOU EVEN FIGURE OUT THIS SYNTAX???????????????///
        const queryParams ='?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get(`/orders.json${queryParams}`)
            .then((response) => {
                console.log("[orders action creator ]", response)
                //formating an object to an array
                // const fetchedOrders = Object.entries(res.data)
                // console.log("Orders -> componentDidMount -> fetchedOrders", fetchedOrders)

                const fetchedOrders = []

                for (let key in response.data) {
                    console.log(response.data[key])
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key

                    })
                    console.log("Orders -> componentDidMount -> fetchedOrders", fetchedOrders)
                }


                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch((err) => {
                console.log("[orders action creator ]", err)
                dispatch(fetchOrdersFailed(err))
            })
    }

}

//synchronous action creator 
export const fetchOrdersSuccess = (ord) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: ord
    }
}

//synchronous action creator
export const fetchOrdersFailed = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: err
    }
}

//for changing the loading state and displaying the spinner
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}



//---------------------------FOR DELETING_ORDERS ORDERS---------------------

export const deleteOrderStart = (id, token, userId) => {
    return (dispatch, getState) => {
        dispatch(deleteOrderStarted())
        // const state = getState()
        // console.log("initFetchingOrders -> state", state)
        // const deleteToken = state.auth.token
        // console.log("initFetchingOrders -> deleteToken", deleteToken)
        // console.log(id)
        axios.delete(`/orders/${id}.json?auth=` + token)
            .then((res) => {
                console.log(res)
                dispatch(deleteOrderSuccess())
                dispatch(initFetchingOrders(token, userId))
            })
            .catch(err => {
                console.log(err)
                dispatch(deleteOrderFailed())
                dispatch(fetchOrdersFailed(err))
            })
    }
}

export const deleteOrderStarted = () => {
    return { type: actionTypes.DELETE_ORDER_STARTED }
}

export const deleteOrderSuccess = () => {
    return { type: actionTypes.DELETE_ORDER_SUCCESS }
}

export const deleteOrderFailed = () => {
    return { type: actionTypes.DELETE_ORDER_FAILED }
}

//---------------FOR GETTING 1 ORDER ------------
export const getOrder = (id, token) => {
    return (dispatch, getState) => {
        dispatch(getOrderStart())
        console.log(id)
        
        axios.get(`/orders/${id}.json?auth=` + token)
            .then(res => {
                console.log("------------------")
                console.log(res)
                dispatch(getOrderSuccess(res.data))
            }).catch(err => {
                console.log(err)
                dispatch(getOrderFailed())
                dispatch(fetchOrdersFailed(err))
            })
    }
}

export const getOrderSuccess = (order) => {
    return {
        type: actionTypes.GET_ORDER_SUCCESS,
        order: order
    }
}

export const getOrderStart = () => {
    return {
        type: actionTypes.GET_ORDER_START
    }
}

export const getOrderFailed = () => {
    return {
        type: actionTypes.GET_ORDER_FAILED
    }
}


// for setting purchased state to false to avoid unwanted redirect 
export const resetPurchasedState = () => {
    return{
        type: actionTypes.SET_PURCHASED_TO_FALSE
    }
}
