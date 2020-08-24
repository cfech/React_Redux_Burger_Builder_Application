import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom"
import CheckoutSummary from "../../components/order/checkoutSummary/checkoutSummary"
import ContactInfo from "./contactData/contactData"

//-------------------------------for redux -------------------------
import { connect } from "react-redux"
// import * as actions from "../../store/actions/index"

class Checkout extends Component {

    //push us to a new route , which loads the nested component
    checkOutContinued = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render() {

        //if


        //redirecting the user if the ingredient state is null, because 1, they are loaded from firebase in the component did mount of the burger builder, so a redirect would always load them,  and if you just reload to /checkout/contact data would be null, and 2 the user would have no reason to be here if the burger was not yet built

        let summary = <Redirect to="/" />
        if (this.props.ing) {

            //for redirecting if the purchase submission was a success, state set in a successful case in the order reducer, which would be called from a synchronous function in the .then of the axios call in the order actionCreators 
            const purchasedRedirect = this.props.purchased ? <Redirect to ="/"/>: null


            summary =
                <div>

                    {purchasedRedirect}
                    <CheckoutSummary {...this.props} ingredients={this.props.ing} checkOutContinued={this.checkOutContinued} />

                    {/* if we pass an anonymous function to the render function that calls for the ContactInfo component we can then pass it props 
             eslint-disable-next-line no-unused-expressions */}
                    <Route exact path={this.props.match.path + "/contact-data"} component={ContactInfo} />

                </div>
        }
        return (
            <div>
                {summary}


            </div>
        )
    }
}

//data flow = CLICK BUTTON -> MAPDISPATCHTOPROPS -> actionTypes -> actionCreators ->  middleware(index.js) -> reducer, updates state -> COMPONENT -> UI

//we can get the state now without having to pass them through queryparams
const mapStateToProps = state => {
    return ({
        ing: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice, 
        purchased: state.orders.purchased
    })
}


export default connect(mapStateToProps)(Checkout)