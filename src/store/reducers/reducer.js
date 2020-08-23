import * as actionTypes from "../action"

const initialState = {
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        ketchup: 0,
        meat: 0

    },
    totalPrice: 4
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

        default:
            return state
    }



}

export default reducer