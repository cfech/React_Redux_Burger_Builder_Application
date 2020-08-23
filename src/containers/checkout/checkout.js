import React, { Component } from "react";
import { Route } from "react-router-dom"
import CheckoutSummary from "../../components/order/checkoutSummary/checkoutSummary"
import ContactInfo from "./contactData/contactData"
import { connect } from "react-redux"

class Checkout extends Component {
    //push us to a new route , which loads the nested component
    checkOutContinued = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render() {
        return (
            <div>
                <CheckoutSummary {...this.props} ingredients={this.props.ing} checkOutContinued={this.checkOutContinued} />

                {/* if we pass an anonymous function to the render function that calls for the ContactInfo component we can then pass it props */}
                <Route exact path={this.props.match.path + "/contact-data"}

                    render={(props) => (
                        <ContactInfo ingredients={this.props.ing} price={this.props.totalPrice} {...this.props} />)} />
            </div>
        )
    }
}

//we can get the state now without having to pass them through queryparams
const mapStateToProps = state => {
    return ({
        ing: state.ingredients,
        totalPrice: state.price
    })
}


export default connect(mapStateToProps)(Checkout)