import React, { Component } from 'react'
import Input from "../../components/UI/inputEl/inputEl"
import Button from "../../components/UI/button/button"
import classes from './auth.css'
import Spinner from "../../components/UI/Spinner/spinner"


//redux
import { connect } from "react-redux"
import * as actionCreators from "../../store/actions/index"



class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }


    // to check if each form element is valid
    checkValidity(value, rules) {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== "" && isValid
        }

        //chain && is valid to pass it through the if statement, to make sure it satisfies every condition
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid

    }

    inputChangedHandler = (e, controlName) => {
        //make high level copy of controls (1) 
        //make copy of control we want (2)
        //update level 2 state value , ie: name.value 
        //check for validation
        //has the form been touched, to know when to apply validation styling

        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        //set the state of the form and validity 
        this.setState({
            controls: updatedControls
        })
    }

    //to sign in/sign up someone based on this.state.isSignUp (url is swapped in the action creator)
    initAuth = (e) => {
        e.preventDefault()
        const user = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }

        this.props.createUser(user, this.state.isSignUp)
    }

    //to switch the state back and forth between sign in and sign up
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }




    render() {

        //for turing form state into a mappable array
        const formElementArray = []

        //loop through the keys of the order form and push the objects to the array
        for (let k in this.state.controls) {
            formElementArray.push({
                id: k,
                config: this.state.controls[k]
            })
        }


        //to render the form elements 
        let form = formElementArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                change={(e) => this.inputChangedHandler(e, formElement.id)}
            />

        ))

        //to handle loading case
        if (this.props.loading) {
            form = <Spinner></Spinner>
        }

        let errorMessage = null

        if (this.props.error) {
            // errorMessage = this.props.error.data.error.message
            if (this.props.error.data.error.message === "EMAIL_EXISTS") {
                errorMessage = <p style={{
                    color: "#6f7c80",
                    fontSize: "15px",
                    textDecoration: "underline"
                }}>Your Email is already registered</p>

            }

            if (this.props.error.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                errorMessage = <p style={{
                    color: "#6f7c80",
                    fontSize: "15px",
                    textDecoration: "underline"
                }}>Your have too many unsuccessful attempts, please try again later</p>

            }

            if (this.props.error.data.error.message === "EMAIL_NOT_FOUND") {
                errorMessage = <p style={{
                    color: "#6f7c80",
                    fontSize: "15px",
                    textDecoration: "underline"
                }}>This email is not in our system</p>

            }

            if (this.props.error.data.error.message === "INVALID_PASSWORD") {
                errorMessage = <p style={{
                    color: "#6f7c80",
                    fontSize: "15px",
                    textDecoration: "underline"
                }}>Password doesn't seem correct</p>

            }

            if (this.props.error.data.error.message === "USER_DISABLED") {
                errorMessage = <p style={{
                    color: "#6f7c80",
                    fontSize: "15px",
                    textDecoration: "underline"
                }}>This account has been disabledt</p>

            }
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.initAuth} >
                    {form}
                    <Button btnType="Success">{this.state.isSignUp ? "SIGN UP" : 'SIGN IN'}</Button>
                </form>


                <Button btnType="Danger" clicked={this.switchAuthModeHandler} >  Switch to {this.state.isSignUp ? "SIGN IN" : 'SIGN UP'}</Button>
            </div>
        )
    }
}

//data flow = CLICK BUTTON -> MAPDISPATCHTOPROPS -> actionTypes -> actionCreators ->  middleware(index.js) -> reducer, updates state -> COMPONENT -> UI

const mapStateToProps = state => {
    return (
        {
            loading: state.auth.loading,
            error: state.auth.error
        })
}

const mapDispatchToProps = dispatch => {
    return ({
        createUser: (user, isSignUp) => { dispatch(actionCreators.authInit(user, isSignUp)) }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)