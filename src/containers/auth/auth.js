import React, { Component } from 'react'
import Input from "../../components/UI/inputEl/inputEl"
import Button from "../../components/UI/button/button"
import classes from './auth.css'

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
        }
    }

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

        const form = formElementArray.map(formElement => (
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
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">Sign</Button>
                </form>
            </div>
        )
    }
}


export default Auth