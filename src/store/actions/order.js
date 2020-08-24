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

//for changing the loading state
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

