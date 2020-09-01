import React, { Component } from "react"
import classes from './changePasswordModal.css'
import Backdrop from "../UI/backdrop/backdrop"
import Input from "../UI/inputEl/inputEl"
import Button from "../UI/button/button"
import Spinner from "../UI/Spinner/spinner"

import { checkValidity } from "../../general/utility"

import * as actionCreators from "../../store/actions/index"
import { connect } from "react-redux"
class ChangePasswordModal extends Component {
    state = {
        passwordControls: {
            newPassword: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "new password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            newPasswordConfirm: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "confirm your password",
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
        formIsValid: false,
        passwordsMatch: false,
    }


    componentWillUnmount(){
        this.props.setPassWordHasBeenResetToFalse()
    }


    inputChangedHandler = (e, controlName) => {
        //make high level copy of controls (1) 
        //make copy of control we want (2)
        //update level 2 state value , ie: name.value 
        //check for validation
        //has the form been touched, to know when to apply validation styling

        let updatedControls = null

        updatedControls = {
            ...this.state.passwordControls,

            [controlName]: {
                ...this.state.passwordControls[controlName],
                value: e.target.value,
                valid: checkValidity(e.target.value, this.state.passwordControls[controlName].validation),
                touched: true
            }
        }

        //for checking total form validation
        let IsFormValid = true

        //Loop through all the inputs in the updatedControls, check if they are true, and pass along the previous IsFormValid value
        for (let inputIdentifier in updatedControls) {
            IsFormValid = updatedControls[inputIdentifier].valid && IsFormValid
        }

        //to check if passwords match, if they dont set the correct state to disable button and show error message
        if (updatedControls.newPassword.value !== updatedControls.newPasswordConfirm.value) {
            this.setState({
                passwordsMatch: false,
                formIsValid: false
            })
        } else {
            this.setState({
                passwordsMatch: true,
                formIsValid: IsFormValid
            })
        }

        this.setState({
            passwordControls: updatedControls,
        })
    }

    handlePasswordUpdate = (e) => {
        e.preventDefault()
        let password = this.state.passwordControls.newPassword.value
        console.log(password)

        this.props.resetPassword(this.props.token, password)
    }

    render(props) {

        //for turing form state into a mappable array
        const formElementArray = []

        //loop through the keys of the order form and push the objects to the array
        for (let k in this.state.passwordControls) {
            formElementArray.push({
                id: k,
                config: this.state.passwordControls[k]
            })
        }

        //map through the array and create inputs with the desired configuration passed through props 
        let form = (
            formElementArray.map(el => {
                return (
                    <Input
                        key={el.id}

                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        change={(e) => this.inputChangedHandler(e, el.id)}
                    />
                )
            })
            // {/* disabled={!this.state.formIsValid} */}
        )

        let modalContent = (
            <form onSubmit={this.handlePasswordUpdate} >
                <h3>Please Enter Your New Password</h3>
                {form}
                <Button btnType="Success" clicked={null} disabled={!this.state.formIsValid}>CHANGE PASSWORD</Button>
            </form>
      )
            if(this.props.loading){
                modalContent = <Spinner/>
            }
            if(this.props.reset){
                modalContent = <div>
                    <h3>Your Password Has Been Reset!</h3>
                    <Button btnType="Success" clicked={this.props.closeModal}>CLOSE</Button>
                </div>
            }
        return (

            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.closeModal} />
                <div className={classes.PasswordModal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}>
                        {modalContent}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.resetPasswordLoading,
        reset: state.auth.passwordHasBeenReset
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: (token, password) => {
            return dispatch(actionCreators.resetUserPassword(token, password))
        }, 
        setPassWordHasBeenResetToFalse: () =>{
            return dispatch(actionCreators.setPassWordHasBeenResetToFalse())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal)