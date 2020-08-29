import React, { Component } from 'react'
import Input from "../../components/UI/inputEl/inputEl"
import Button from "../../components/UI/button/button"
import classes from './auth.css'
import Spinner from "../../components/UI/Spinner/spinner"
import { Redirect } from "react-router-dom"


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

        signUpControls: {
            firstName: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "First Name",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Last Name",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
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
            Address: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Address",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            Town: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Town/City",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            State: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "State",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            Country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            ZipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Zip Code",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            verifyPassword: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Verify Your Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            
            selectDeliveryMethod: {
                elementType: "inputReadOnly",
                elementConfig: {
                    type: "text",
                    placeholder: "Select Your Delivery Method:",
                },
                value: "",
                validation: {
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "Please Select Delivery Option", displayValue: "Please Select Delivery Option" },
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ],
                },
                validation: {},
                value: "fastest",
                valid: true
            },
        },
        isSignUp: false,
        passwordsMatch: true
    }


    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirect !== "/") {
            this.props.onSetAuthRedirectPath()
        }
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

        let updatedControls = null
        if (this.state.isSignUp) {
            updatedControls = {
                ...this.state.signUpControls,
                [controlName]: {
                    ...this.state.signUpControls[controlName],
                    value: e.target.value,
                    valid: this.checkValidity(e.target.value, this.state.signUpControls[controlName].validation),
                    touched: true
                }
            }

            //to check if passwords match
            if (updatedControls.password.value !== updatedControls.verifyPassword.value) {
                this.setState({
                    passwordsMatch: false
                })
            } else {
                this.setState({
                    passwordsMatch: true
                })
            }
            //set the state of the form and validity 
            this.setState({
                signUpControls: updatedControls
            })

        } else {
            updatedControls = {
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
    }


    //to sign in/sign up someone based on this.state.isSignUp (url is swapped in the action creator)
    initAuth = (e) => {
        e.preventDefault()
        let user = null
        if (!this.state.isSignUp) {
            user = {
                email: this.state.controls.email.value,
                password: this.state.controls.password.value
            }
        } else {
            user = {
                firstName: this.state.signUpControls.firstName.value,
                lastName: this.state.signUpControls.lastName.value,
                email: this.state.signUpControls.email.value,
                password: this.state.signUpControls.password.value,
                address: this.state.signUpControls.Address.value,
                town: this.state.signUpControls.Town.value,
                state: this.state.signUpControls.State.value,
                country: this.state.signUpControls.Country.value,
                zipCode: this.state.signUpControls.ZipCode.value,
                deliveryMethod: this.state.signUpControls.deliveryMethod.value

            }
        }

        if (this.state.passwordsMatch){
            this.props.createUser(user, this.state.isSignUp)
        }
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
        let passwordError = null

        if (!this.state.passwordsMatch) {
            passwordError = <div>
                <p style={{
                    color:"red",
                    textDecoration: "underline"
                }} >Please Confirm Your Passwords Match</p>
            </div>
        }

        //for turing form state into a mappable array
        const formElementArray = []

        //loop through the keys of the order form and push the objects to the array
        if (!this.state.isSignUp) {
            for (let k in this.state.controls) {
                formElementArray.push({
                    id: k,
                    config: this.state.controls[k]
                })
            }
            // console.log(formElementArray)
        } else {
            for (let k in this.state.signUpControls) {
                formElementArray.push({
                    id: k,
                    config: this.state.signUpControls[k]
                })
            }
            //to render the form elements 
        }


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
                }}>This account has been disabled</p>

            }

            if (this.props.error.data.error.message === "MISSING_PASSWORD") {
                errorMessage = <p style={{
                    color: "#6f7c80",
                    fontSize: "15px",
                    textDecoration: "underline"
                }}>Please enter a password</p>

            }
        }

        let authRedirect = null
        if (this.props.isLoggedIn) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.initAuth} >
                    {passwordError}
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
            error: state.auth.error,
            isLoggedIn: state.auth.token !== null,
            buildingBurger: state.burgerBuilder.building,
            authRedirectPath: state.auth.authRedirectPath

        })
}

const mapDispatchToProps = dispatch => {
    return ({
        createUser: (user, isSignUp) => { dispatch(actionCreators.authInit(user, isSignUp)) },
        onSetAuthRedirectPath: () => { dispatch(actionCreators.setAuthRedirectPath("/")) }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)