//data flow = click Button -> mapDispatchToProps -> actionTypes -> actionCreators ->  middleware(index.js) -> REDUCER, updates state -> component -> UI

import * as actionTypes from "../actions/actionTypes"
//reducer for burger builder

//THIS REDUCER IS THE LEANED OUT EXAMPLE , USING UTILITY FUNCTIONS AND EXTRACTED LOGIC
import { updateObject } from "../../general/utility"


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false, 
    building: false
}

const INGREDIENTPRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    ketchup: 0.2
}


const addIngredient = (state, action) => {
     const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTPRICES[action.ingredientName], 
                building: true
            }
            return updateObject(state, updatedState)
}

const deleteIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngs = updateObject(state.ingredients, updatedIng)
            const updatedSTate = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENTPRICES[action.ingredientName], 
                building: true
            }
            return updateObject(state, updatedSTate)
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        //--------------------outsourced function example------------------------------
        case actionTypes.ADD_INGREDIENT:
           return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return deleteIngredient(state, action)
//--------------------outsourced function example------------------------------




        //if want to use this in axios.then to call action creator
        // case actionTypes.SET_INGREDIENTS:
        // console.log(action.ingredients)    
        // return{
        //         ...state, 
        //         ingredients: action.ing
        //     }

        case actionTypes.SET_INGREDIENTS:

            return updateObject(state, {
                ingredients: action.ing,
                error: false,
                totalPrice: 4, 
                building: false
            })

        case actionTypes.FETCH_ING_FAILED:
            return updateObject(state, { error: true })
        default:
            return state
    }
}

export default reducer