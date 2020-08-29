import React, { Component } from 'react'
import Aux from "../../../hoc/aux/Auxiliary"
import Button from "../../UI/button/button"
// import { Link } from "react-router-dom"
class OrderSummary extends Component {
    //checking if it updated
    componentDidUpdate() {
        //console.log("order summary will update")
    }

    render(props) {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (<li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
                        {this.props.ingredients[igKey]}</li>)
            })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>

                {/* Using a link is one (111) way */}
                {/* <Link to="/checkout"><Button btnType="Success" >Continue</Button></Link> */}


                {/* (2222) could also use a  function to call this.props.history.push("/checkout") onto the stack */}
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>)
    }


}











export default OrderSummary