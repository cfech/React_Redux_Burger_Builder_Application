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
    singleAccountError: null,
    redirect: false, 
    resetPasswordLoading: false, 
    passwordHasBeenReset: false, 
    resetPasswordError: null
}
//-----------------------USER AUTH---------------------------------------------------

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
        loading: false,
        

    })
}

//if we get an error we store the error
const authFail = (state, action) => {
    return updateObject(state, { error: action.error.response, loading: false })
}

//logging out The user 
const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null })
}

//-----------------------USER AUTH---------------------------------------------------

//for conditional redirection if the user has built a burger without logging in
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

//---------------------------------SINGLE USER INFO---------------------------------------
//for setting user data to be displayed in he userInfo page
const setSingleUserInfo = (state, action) => {
    return updateObject(state, {loading: false, loggedInUser: action.userInfo,  })
}

//for setting loading in get single user
const getSingleUserStart = (state, action) => {
    return updateObject(state, { loading: true })
}
// for setting error if user retrieval fails
const getSingleUserFailed = (state, action) => {
    return updateObject(state, { loading: false, singleAccountError: action.error })
}
//---------------------------------SINGLE USER INFO---------------------------------------
//-------------------------------- UPDATING USER INFO -----------------------------------
const updateUserStart = (state, action) => {
    return { ...state, loading: true }
}

const updateUserSuccess = (state, action) => {
    return { ...state, loading: false, redirect: true }
}

const updateUserFailed = (state, action) => {
    return { ...state, loading: false, error: action.error }
}
//-------------------------------- UPDATING USER INFO -----------------------------------

//resetting the redirect state that controls the redirection render on update user page
const resetAuthRedirect = (state, action) => {
    return{...state, redirect: false}
}

//------------------------------RESETTING USER PASSWORD --------------------------------------
const startResetPassword = (state, action) => {
    return updateObject(state, {resetPasswordLoading: true})
}

const resetPasswordSuccess = (state, action) => {
    return updateObject(state, {resetPasswordLoading: false, passwordHasBeenReset: true, token: action.newIdToken})
}

const resetPasswordFailed = (state, action) => {
    return updateObject(state, {resetPasswordLoading: false, resetPasswordError: action.error})
}

const setPassWordHasBeenResetToFalse = (state, action) =>{
    return updateObject(state, {passwordHasBeenReset: false})
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
        case actionTypes.START_USER_UPDATE:
            return updateUserStart(state, action)
        case actionTypes.USER_UPDATE_SUCCESS:
            return updateUserSuccess(state, action)
        case actionTypes.USER_UPDATE_FAILED:
            return updateUserFailed(state, action)
        case actionTypes.RESET_AUTH_REDIRECT:
            return resetAuthRedirect(state, action)
        case actionTypes.START_PASSWORD_UPDATE:
            return startResetPassword(state, action)
        case actionTypes.UPDATE_PASSWORD_SUCCESS:
            return resetPasswordSuccess(state, action)
        case actionTypes.UPDATE_PASSWORD_FAILED:
            return resetPasswordFailed(state, action)
        case actionTypes.SET_PASSWORD_HAS_BEEN_RESET_TO_FALSE:
            return setPassWordHasBeenResetToFalse(state, action) 
        default:
            return state
    }

}

export default reducer