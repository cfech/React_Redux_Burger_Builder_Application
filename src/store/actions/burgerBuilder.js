//action creators for building burger
//data flow = click Button -> mapDispatchToProps -> actionTypes -> ACTIONCREATORS ->  middleware(index.js) -> reducer, updates state -> component -> UI

import * as actionTypes from "./actionTypes"
import axios from "../../axios_orders"


export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT, ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName
    }
}


//async action creator
//has access to dispatch from thunk , called on load of homepage
export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-burger-builder-5a549.firebaseio.com/ingredients.json")
            .then(response => {
                console.log(response)
                dispatch(setIngredients(response.data))
            }).catch(err => {
                dispatch(fetchIngredientsFailed())
            })
    }
}

//synchronous action creator
const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ing: ingredients
    }
}

//synchronous action creator
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_ING_FAILED
    }
}
