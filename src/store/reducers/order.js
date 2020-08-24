//data flow = click Button -> mapDispatchToProps -> actionTypes -> actionCreators ->  middleware(index.js) -> REDUCER, updates state -> component -> UI

//reducer for handling order

import * as actionTypes from "../actions/actionTypes"

const initialState = {
    orders: [],
    loading: false,
    error: null, 
    purchased: false,
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


                //add the order to the orders array using concat, which returns a whole new array with the previous state and the new order addedon 
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
                return{
                    ...state, 
                    loading: true
                }

                case actionTypes.PURCHASE_INIT:
                    return{
                        ...state, 
                        purchased: false
                    }
        default:
            return state;
    }
}

export default reducer