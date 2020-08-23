import React, { Component } from "react";
import { Route } from "react-router-dom"

import CheckoutSummary from "../../components/order/checkoutSummary/checkoutSummary"

import ContactInfo from "./contactData/contactData"



class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }


    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search)

        const retrievedIngredients = {};
        let price = 0

        for (let param of query.entries()) {
            if (param[0] === "price") {

                price = param[1]

            } else {
                retrievedIngredients[param[0]] = +param[1]
            }
        }

        this.setState({
            ingredients: retrievedIngredients,
            totalPrice: price
        })
    }

    checkOutContinued = () => {

        this.props.history.replace("/checkout/contact-data")
    }

    render() {




        return (
            <div>
                <CheckoutSummary {...this.props} ingredients={this.state.ingredients} checkOutContinued={this.checkOutContinued} />

                {/* if we pass an anonymous function to the render function that calls for the ContactInfo component we can then pass it props */}
                <Route exact path={this.props.match.path + "/contact-data"} render={(props) => (
                <ContactInfo ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>)} />
            </div>
        )
    }



}

export default Checkout