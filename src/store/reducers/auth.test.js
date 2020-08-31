//----------TESTING REDUX, DONT NEED ENZYME BECAUSE WE DO NOT RENDER ANYTHING------

//need access to the reducer and actionType
import reducer from "./auth"
import * as actionTypes from "../actions/actionTypes"

describe("auth reducer", () => {
    it("should return initial state if given invalid actionType ", () => {

        //inside expect, execute code you want to inspect
        //undefined is initial state
        expect(reducer(undefined, { type: actionTypes.NOT_A_REAL_ACTION })).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        })
    })

    //this test shows the reducer with actionType auth success can take the info given by the action type and payload, and set the state accordingly
    it("should store token and userId upon login", () =>{
        expect(reducer(
            //beginning state
            {
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: true
        }, 

        //action and payload
        {type: actionTypes.AUTH_SUCCESS,
            data:{
                idToken: 972948723472398,
                localId: 38489398
            }
        }
        
        )).toEqual({
            token: 972948723472398,
            userId: 38489398,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: true
        })
    })


    it("should set error to null and loading to true upon the user clicking log in", () =>{
        expect(reducer(
            //beginning state
            {
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        }, 

        //action and payload
        {type: actionTypes.AUTH_START,
        }
        
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: true,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        })
    })

    it("should set error to the error and loading to false upon the log in failure", () =>{
        expect(reducer(
            //beginning state
            {
            token: null,
            userId: null,
            error: null,
            loading: true,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        }, 

        //action and payload
        {type: actionTypes.AUTH_FAILED,error:{
            response: "there was an error"
        }
        }
        
        )).toEqual({
            token: null,
            userId: null,
            error: "there was an error",
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        })
    })
    
    it("should set token and userId to null upon user log out", () =>{
        expect(reducer(
            //beginning state
            {
            token: 99873289798,
            userId: 727348736,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        }, 

        //action and payload
        {type: actionTypes.AUTH_LOGOUT
        }
        
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        })
    })

    it("should set redirect path used to redirect a user under the circumstance they are building a burger before logging in", () =>{
        expect(reducer(
            //beginning state
            {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        }, 

        //action and payload
        {type: actionTypes.SET_AUTH_REDIRECT_PATH, path:"/checkout"
        }
        
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/checkout",
            loggedInUser: null,
            singleAccountError: null
        })
    })

    it("should set loggedIn users info when they visit he myAccount page", () =>{
        expect(reducer(
            //beginning state
            {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        }, 

        //action and payload
        {type: actionTypes.GET_USER_INFO_SUCCESS, userInfo:"new user"
        }
        
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: "new user",
            singleAccountError: null
        })
    })

    it("should set loading to true upon the start of getting a single user info", () =>{
        expect(reducer(
            //beginning state
            {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        }, 

        //action and payload
        {type: actionTypes.GET_USER_INFO_START
        }
        
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: true,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        })
    })
    it("should set loading to false and singleAccountError to the error  upon getting user failed ", () =>{
        expect(reducer(
            //beginning state
            {
            token: null,
            userId: null,
            error: null,
            loading: true,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: null
        }, 

        //action and payload
        {type: actionTypes.GET_USER_INFO_FAILED, error:"some error"
        }
        
        )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
            loggedInUser: null,
            singleAccountError: "some error"
        })
    })

})