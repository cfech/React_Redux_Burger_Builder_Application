import React, { Component } from "react";
import Button from "../../../components/UI/button/button"

import classes from './contactData.css'
import axios from '../../../axios_orders'

import Spinner from "../../../components/UI/Spinner/spinner"


class ContactData extends Component {
    state = {
        name: " ",
        email: "",
        address: {
            street: "",
            zipCode: ""
        },
        loading: false

    }

    orderHandler = (e) => {
        e.preventDefault()
        console.log(this.props.ingredients)

        this.setState({
            loading: true
        })


        //alert("You have continued")
        //will send post request to baseUlr + /orders, need .json for firebase
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Connor",
                address: {
                    street: "Test Street",
                    zipCode: "88545",
                    country: "USA"
                },
                email: "Test@test.com",
            },
            deliveryMethod: "ASAP"
        }
        axios.post("/orders.json", order)
            .then(response => {
                console.log(response)
                this.setState({
                    loading: false
                })
                this.props.history.push("/")
            }).catch(err => {
                console.log(err)
                this.setState({
                    loading: false
                })
            })


    }

    render() {
        let form = (<form>
            <input className={classes.input} type=" text" name="name" placeholder="Your Name" />
            <input className={classes.input} type=" text" name="email" placeholder="Email" />
            <input className={classes.input} type=" text" name="street" placeholder="Street" />
            <input className={classes.input} type=" text" name="zip" placeholder="Zip Code" />

            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        )


        if (this.state.loading) {
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

export default ContactData