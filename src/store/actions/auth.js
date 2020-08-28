//data flow = click Button -> mapDispatchToProps -> actionTypes -> ACTIONCREATORS ->  middleware(index.js) -> reducer, updates state -> component -> UI

//action creators for authentication
import * as actionTypes from "./actionTypes"
import axios from "axios"


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
        // console.log(authData)
        axios.post(url, authData)
            .then(res => {
                // console.log(res)

                localStorage.setItem("token", res.data.idToken)
                //will give us the current date + time that the token expires in
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                console.log("authInit -> expirationDate", expirationDate)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("userId", res.data.localId)
                dispatch(authSuccess(res.data))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            }).catch(err => {
                // console.log(err)
                // console.log(err.response)
                dispatch(authFailed(err))
            })
    }
}

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

//to call a function to log out the user after 1 hr , or any expiration time
export const checkAuthTimeout = (expires) => {
    return dispatch => {
        console.log("expires",expires)
        setTimeout(() => {
            dispatch(logout())
        }, expires * 1000)

    }
}


//for logging user out 
export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }

}

//for conditional redirection
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

//for checking local storage to see if logged in pure utility function
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        // console.log("authCheckState -> token", token)
        //if no token, dispatch logout, just to clean up any leftover state
        if (!token) {
            dispatch(logout())
        } else {
            const expirationTime = new Date(localStorage.getItem("expirationDate"))
            console.log("authCheckState -> expirationTime", expirationTime)
            if (expirationTime < new Date()) {
                console.log("============")
                dispatch(logout())
            } else {
                const userId = localStorage.getItem("userId")

                //----------COULD GET USER ID FROM GOOGLE WITH THIS AXIOS.POST REQUEST-----------
                // const data ={ idToken: token}
                // axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDyksb4UZ6Cac6c2InQlGJMknHV149eY2Q", data)
                // .then(res => {
                //     console.log(res)
                // })
                //----------COULD GET USER ID FROM GOOGLE WITH THIS AXIOS.POST REQUEST-----------

                //sets user info into state
                const authData = {
                    idToken: token,
                    localId: userId
                }
                dispatch(authSuccess(authData))

                //will log user out when this time hits, passing along something like 360000 milliseconds, or 1 hrs
                console.log("+=======",expirationTime - new Date().getSeconds())
                dispatch(checkAuthTimeout((expirationTime.getTime()  - new Date().getTime())/ 1000))
            }

        }
    }
}
