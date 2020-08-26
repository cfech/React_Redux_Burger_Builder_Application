//data flow = click Button -> mapDispatchToProps -> actionTypes -> ACTIONCREATORS ->  middleware(index.js) -> reducer, updates state -> component -> UI

//action creators for authentication
import * as actionTypes from "./actionTypes"
import axios from "axios"


//synchronous action creator for setting loading state
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

//synchronous action creator fro passing along data in the event of a successful case 
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: authData
    }
}


//synchronous action creator for passing along errors in a failed case
export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err
    }
}


//asynchronous action creator for singing in/up a user , depending on the isSignUp boolean value
export const authInit = (user, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            ...user,
            returnSecureToken: true
        }

        //for signing up
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyksb4UZ6Cac6c2InQlGJMknHV149eY2Q"

        //for signing in
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyksb4UZ6Cac6c2InQlGJMknHV149eY2Q"
        }
        console.log(authData)
        axios.post(url, authData)
            .then(res => {
                console.log(res)
                dispatch(authSuccess(res.data))
            }).catch(err => {
                console.log(err)
                console.log(err.response)
                dispatch(authFailed(err))
            })
    }
}