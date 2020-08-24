//data flow = click Button -> mapDispatchToProps -> actionTypes -> actionCreators ->  middleware(index.js) -> REDUCER, updates state -> component -> UI

import * as actionTypes from "../actions/actionTypes"
//reducer for burger builder


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENTPRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    ketchup: 0.2
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //will be the ingredient over ridden: the new value of that ingredient
                    //cheese : 0 + 1
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTPRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //will be the ingredient over ridden: the new value of that ingredient
                    //cheese : 0 + 1
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTPRICES[action.ingredientName]
            }

        //if want to use this in axios.then
        // case actionTypes.SET_INGREDIENTS:
        // console.log(action.ingredients)    
        // return{

        //         ...state, 
        //         ingredients: action.ing
        //     }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ing, 
                error: false, 
                totalPrice: 4

            }

        case actionTypes.FETCH_ING_FAILED:
            return {
                ...state, error: true
            }


        default:
            return state
    }



}

export default reducer