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
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.REACT_APP_FIREBASE_KEY

        //for signing in
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.REACT_APP_FIREBASE_KEY
        }
        // console.log(authData)
        axios.post(url, authData)
            .then(res => {
                console.log(res)

                // for saving user data 
                if (isSignUp) {
                    dispatch(saveUserInfo(authData, res.data))
                }



                localStorage.setItem("token", res.data.idToken)
                //will give us the current date + time that the token expires in
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("userId", res.data.localId)
                dispatch(authSuccess(res.data))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            }).catch(err => {
                console.log(err)
                console.log(err.response)
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
            // console.log("authCheckState -> expirationTime", expirationTime)
            if (expirationTime < new Date()) {
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
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

//for saving a single users info
export const saveUserInfo = (userData, res) => {
    return dispatch => {
        dispatch(saveSingleUserStart())
        // console.log(userData)
        // console.log(res)
        const userInfo = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userId: res.localId,
            address: userData.address,
            town: userData.town,
            state: userData.state,
            zipCode: userData.zipCode,
            country: userData.country,
            deliveryMethod: userData.deliveryMethod
        }

        axios.post("https://react-burger-builder-5a549.firebaseio.com/users.json", userInfo)
            .then(res => {
                console.log(res)
                dispatch(saveSingleUserSuccess())
            }).catch(err => {
                console.log(err)
                dispatch(saveSingleUserFailed())
            })
    }
}

export const saveSingleUserStart = () => {
    return { type: actionTypes.SAVED_USER_INFO_START }
}

export const saveSingleUserSuccess = () => {
    return { type: actionTypes.SAVED_USER_INFO }
}

export const saveSingleUserFailed = () => {
    return { type: actionTypes.SAVED_USER_INFO_FAILED }
}


//for getting single user info
export const getUserInfoInit = (id) => {
    return dispatch => {
        dispatch(getUserInfo())
        // console.log(id)
        const queryParams = '?orderBy="userId"&equalTo="' + id + '"'
        // console.log(queryParams)
        axios.get("https://react-burger-builder-5a549.firebaseio.com/users.json" + queryParams)
            .then(res => {
                console.log(res.data)
                let key = Object.keys(res.data)[0]
                // console.log(key)
                const usrData = { ...res.data[key], dataBaseId: key }
                // console.log("getUserInfoStart -> usrData", usrData)

                dispatch(setUserInfo(usrData))
            }).catch(err => {
                console.log(err)
                dispatch(getUserInfoFailed(err))
            })
    }
}

export const getUserInfo = () => {
    return { type: actionTypes.GET_USER_INFO_START }
}

export const setUserInfo = (userInfo) => {
    return {
        type: actionTypes.GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

export const getUserInfoFailed = (err) => {
    return { type: actionTypes.GET_USER_INFO_FAILED, error: err }
}

//-----------------------------------UPDATE USER --------------------------------------------------
//for updating a users information, asysnc function
export const updateUserInfo = (userDataInfoId, userData) => {
    return dispatch => {
        console.log(userDataInfoId)
        // const queryParams = '?equalTo="' + userDataInfoId + '"'
        // console.log(queryParams)
        console.log(userData)
        dispatch(updateUserStart())
        axios.patch(`https://react-burger-builder-5a549.firebaseio.com/users/${userDataInfoId}.json`, userData)
            .then(res => {
                console.log(res)
                dispatch(updateUserSuccess())
            })
            .catch(err => {
                console.log(err)
                dispatch(updateUserFailed(err))
            })
    }
}

export const updateUserStart = () => {
    return { type: actionTypes.START_USER_UPDATE }
}

export const updateUserSuccess = (res) => {
    return { type: actionTypes.USER_UPDATE_SUCCESS }
}

export const updateUserFailed = (err) => {
    return { type: actionTypes.USER_UPDATE_FAILED, error: err }
}


//for resetting the redirect on update user page
export const resetRedirect = () => {
    return { type: actionTypes.RESET_AUTH_REDIRECT }
}

//---------------------------------RESETTING USERS PASSWORD------------------------
export const resetUserPassword = (token, password) => {
    return dispatch => {
        dispatch(startPasswordReset())
        const userResetInfo = {
            idToken: token,
            password: password,
            returnSecureToken: true

        }
        console.log(userResetInfo)
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_KEY}`, userResetInfo)
        .then(res => {
            console.log(res)
            console.log(res.response)
            const newIdToken = res.data.idToken
            dispatch(passwordResetSuccess(newIdToken))
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
            dispatch(passwordResetFailed(err))
        })
    }
}

export const startPasswordReset = () => {
    return{type: actionTypes.START_PASSWORD_UPDATE}
}

export const passwordResetSuccess = (newIdToken) => {
    return{type: actionTypes.UPDATE_PASSWORD_SUCCESS, newIdToken:newIdToken}
}

export const passwordResetFailed = (err) => {
    return{type: actionTypes.UPDATE_PASSWORD_FAILED, error: err}
}


export const setPassWordHasBeenResetToFalse = () =>{
    return{type: actionTypes.SET_PASSWORD_HAS_BEEN_RESET_TO_FALSE}
}