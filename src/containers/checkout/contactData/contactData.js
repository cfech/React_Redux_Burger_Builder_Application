import React, { Component } from "react";
import Button from "../../../components/UI/button/button"
import classes from './contactData.css'
import Spinner from "../../../components/UI/Spinner/spinner"
import Input from "../../../components/UI/inputEl/inputEl"

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../../axios_orders"

import { connect } from "react-redux"
import * as actionCreators from "../../../store/actions/index"



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Name",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "State",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Zip",
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
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
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
                    required: true
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
        formIsValid: false

    }

    orderHandler = (e) => {
        e.preventDefault()

        const formData = {}

        // loop over the oderform state and make form data into an object with name: "Connor", street: "street" structure
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }


        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            timeStamp: new Date()
        }

        this.props.initiateOrder(order)
        //will send post request to baseUlr + /orders, need .json for firebase

    }


    //checks validity of each specific field 
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
        return isValid

    }



    //for updating form state
    inputChangedHandler = (e, inputIdentifier) => {

        //make copy of original state, this is only level 1 tho 
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        //extract copy of level 2 of orional state, ie, name, email etc..
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        //update level 2 state value , ie: name.value 
        updatedFormElement.value = e.target.value

        //for checking if input is valid , ie: not blank 
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        //has the form been touched, to know when to apply validation styling 
        updatedFormElement.touched = true

        //update the level 1 state to reflect the changes made in level 2 
        updatedOrderForm[inputIdentifier] = updatedFormElement

        //for checking total form validation
        let isFormValid = true

        //Loop through all the inputs in the orderform, check if they are true, and pass along the previous formIsValid value
        for (let inputIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid
        }

        //set the state of the form and validity 
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: isFormValid
        })

    }

    render() {

        //for turing form state into a mapable array
        const formElementArray = []

        //loop through the keys of the order form and push the objects to the array
        for (let k in this.state.orderForm) {
            formElementArray.push({
                id: k,
                config: this.state.orderForm[k]
            })
        }

        //map through the array and create inputs with the desired configuration passed through props 
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArray.map(el => {
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
            })}

            <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Info</h4>
                {form}
            </div>
        )
    }

}


//data flow = CLICK BUTTON -> MAPDISPATCHTOPROPS -> actionTypes -> actionCreators ->  middleware(index.js) -> reducer, updates state -> COMPONENT -> UI
const mapStateToProps = state => {
    return ({
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading
    })
}

const mapDispatchToProps = dispatch => {
    return {
        initiateOrder: (order) => dispatch(actionCreators.initiateOrder(order))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))