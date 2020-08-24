//data flow = click Button -> mapDispatchToProps -> actionTypes -> ACTIONCREATORS ->  middleware(index.js) -> reducer, updates state -> component -> UI
import * as actionTypes from "./actionTypes"
import axios from "../../axios_orders"

//async function, dispatch made available with thunk middleware
export const initiateOrder = (order) => {
    return dispatch => {
        //just for setting loading to true
        dispatch(purchaseBurgerStart())

        //to post a burger to the server
        axios.post("/orders.json", order)
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
export const initFetchingOrders = () => {
    return dispatch => {

        //to set loading state
        dispatch(fetchOrderStart())

        axios.get('/orders.json')
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
