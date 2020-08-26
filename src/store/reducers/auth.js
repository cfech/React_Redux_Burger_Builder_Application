//data flow = click Button -> mapDispatchToProps -> actionTypes -> actionCreators ->  middleware(index.js) -> REDUCER, updates state -> component -> UI


//reducer for authentication
import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility"


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null
}

// for setting loading
const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

// if we get a successful response we want to store the information about the user in state
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.data.idToken,
        userId: action.data.localId,
        error: null,
        loading: false

    })
}

//if we get an error we store the error
const authFail = (state, action) => {
    console.log(action)
    return updateObject(state, { error: action.error.response, loading: false })
}

//leaned out reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAILED:
            return authFail(state, action)
        default:
            return state
    }

}

export default reducer