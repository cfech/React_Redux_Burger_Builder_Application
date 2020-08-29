//data flow = click Button -> mapDispatchToProps -> actionTypes -> actionCreators ->  middleware(index.js) -> REDUCER, updates state -> component -> UI

//reducer for authentication
import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../../general/utility"

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null,
    authRedirectPath: "/", 
    loggedInUser: null, 
    singleAccountError: null
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
    return updateObject(state, { error: action.error.response, loading: false })
}

//logging out he user 
const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null })
}

//for conditional redirection
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

//for setting user data to be displayed in he userInfo page
const setSingleUserInfo = (state, action) => {
    return updateObject(state, {loggedInUser: action.userInfo, loading: false})
}

//for setting loading in get single user
const getSingleUserStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const getSingleUserFailed = (state, action) => {
    return updateObject(state, {loading: false, singleAccountError: action.error})
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
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action)
        case actionTypes.GET_USER_INFO_SUCCESS:
            return setSingleUserInfo(state, action) 
        case actionTypes.GET_USER_INFO_START:
            return getSingleUserStart(state, action)
        case actionTypes.GET_USER_INFO_FAILED:
            return getSingleUserFailed(state, action)
        default:
            return state
    }

}

export default reducer