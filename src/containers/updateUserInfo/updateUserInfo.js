import React, { Component } from "react"
import {Redirect} from "react-router-dom"
import Input from "../../components/UI/inputEl/inputEl"

import classes from './updateUserInfo.css'
import Button from "../../components/UI/button/button"
import Spinner from "../../components/UI/Spinner/spinner"
import { connect } from "react-redux"
import * as actionCreators from "../../store/actions/index"
class UpdateUser extends Component {
    state = {
        updateInputs: {
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
        loading: true
    }

    componentDidMount() {
        this.props.setLoggedInUser(this.props.userId)
        setTimeout(() => {
            this.insertUserInfo()
        }, 1000)

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

        updatedControls = {
            ...this.state.updateInputs,

            [controlName]: {
                ...this.state.updateInputs[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.updateInputs[controlName].validation),
                touched: true
            }
        }

        this.setState({
            updateInputs: updatedControls
        })

    }

    // for sending data to the server
    initDataUpdate = (e) => {
        e.preventDefault()
        const userInput = {
            firstName: this.state.updateInputs.firstName.value,
            lastName: this.state.updateInputs.lastName.value,
            address: this.state.updateInputs.Address.value,
            town: this.state.updateInputs.Town.value,
            state: this.state.updateInputs.State.value,
            country: this.state.updateInputs.Country.value,
            ZipCode: this.state.updateInputs.ZipCode.value,
            deliveryMethod: this.state.updateInputs.deliveryMethod.value,

        }
        console.log(userInput)
        this.props.updateUserInfo(this.props.loggedInUser.dataBaseId, userInput)
    }


    //for populating user info into the state/form
    insertUserInfo = () => {
        if (this.props.loggedInUser) {
            this.setState({
                updateInputs: {
                    firstName: {
                        elementType: "input",
                        elementConfig: {
                            type: "text",
                            placeholder: "First Name",
                        },
                        value: this.props.loggedInUser.firstName,
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
                        value: this.props.loggedInUser.lastName,
                        validation: {
                            required: true
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
                        value: this.props.loggedInUser.address,
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
                        value: this.props.loggedInUser.town,
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
                        value: this.props.loggedInUser.state,
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
                        value: this.props.loggedInUser.country,
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
                        value: this.props.loggedInUser.zipCode,
                        validation: {
                            required: true,
                            minLength: 5,
                            maxLength: 5
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
                loading:false
            })
        }
        else { console.log("else") }
    }

    render() {
        // let updateForm =


        //for turning form state into a mappable array
        const formElementArray = []

        //loop through the keys of the order form and push the objects to the array
        for (let k in this.state.updateInputs) {
            formElementArray.push({
                id: k,
                config: this.state.updateInputs[k]
            })
        }
        // console.log(formElementArray)


        let form = <Spinner />

        if (!this.state.loading) {
            form = formElementArray.map(formElement => (
                <div key={formElement.id} className={classes.FormElement}> <p>{formElement.id}</p>
                    <Input
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        change={(e) => this.inputChangedHandler(e, formElement.id)}
                    />
                </div>
            ))
        }

        // console.log(form)

        let redirect = null
        if(this.props.redirect){
            redirect = <Redirect to= "/myAccount"/>
        }

        return (
            <div className={classes.formContainer}>
                {redirect}
                <h3 style={{ textAlign: "center" }}>Please Update Your Information</h3>
                <form style={{ textAlign: "center" }} onSubmit={this.initDataUpdate}>
                    {form}
                    <Button btnType="Success" >Submit</Button>
                </form>
                <p className={classes.Back} >back</p>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        loading: state.auth.loading,
        loggedInUser: state.auth.loggedInUser,
        error: state.auth.error,
        redirect: state.auth.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser: (id) => {
            return dispatch(actionCreators.getUserInfoInit(id))
        },
        updateUserInfo: (dataBaseId, userData) => {
            return dispatch(actionCreators.updateUserInfo(dataBaseId, userData))
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)