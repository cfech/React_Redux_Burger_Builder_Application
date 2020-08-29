//data flow = click Button -> mapDispatchToProps -> actionTypes -> actionCreators ->  middleware(index.js) -> REDUCER, updates state -> component -> UI

//reducer for handling order

import * as actionTypes from "../actions/actionTypes"

const initialState = {
    orders: [],
    loading: false,
    error: null,
    purchased: false,
    order: null,
    ing: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                //add the order to the orders array using concat, which returns a whole new array with the previous state and the new order added on 
                orders: state.orders.concat(newOrder),
                purchased: true
            }

        case actionTypes.ORDER_FAILURE:
            return {
                ...state,
                loading: false
            }

        //for setting loading state to initiate spinner 
        case actionTypes.ORDER_BURGER_START:
            return {
                ...state,
                loading: true
            }

        //for when user makes a second purchase, resetting the state/props that sets the redirect from checkout page
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }

        //for managing orders page loading state, 
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }

        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                //error is handled in hoc
                // error: action.error,
                loading: false
            }

        case actionTypes.GET_ORDER_SUCCESS:
            let newIngredients = []
            //for transforming ingredients into an array
            for (let ingredientName in action.order.ingredients) {
                newIngredients.push({
                    name: ingredientName,
                    amount: action.order.ingredients[ingredientName]
                })
            }
            return {
                ...state,
                order: {
                    ...action.order,
                    ing: newIngredients
                }
            }

            //this case it to avoid a random redirect when signing in and purchasing a burger
            case actionTypes.SET_PURCHASED_TO_FALSE:
                return{...state, purchased:false}
        default:
            return state;
    }
}

export default reducer