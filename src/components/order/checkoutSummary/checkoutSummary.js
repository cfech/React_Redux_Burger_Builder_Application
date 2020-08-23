import React from 'react'
import Burger from "../../Burger/burger"
import Button from "../../UI/button/button"
import classes from './checkoutSummary.css'
// import {withRouter} from "react-router-dom"

const checkoutSummary = (props) => {

//history object of the router made available by using withRouter or passing {...props} from high level component
const cancelOrderHandler = () => {

    props.history.goBack()
}



    return (
        <div className={classes.CheckoutSummary}>
            <h1>Enjoy your burger!</h1>

            <div style={{ width: "100%", height: "300px", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />

            </div>

            <Button btnType="Danger" clicked ={cancelOrderHandler} >Cancel</Button>
            <Button btnType="Success" clicked={props.checkOutContinued} >Continue</Button>
        </div>


    );

};

export default checkoutSummary

// export default withRouter(checkoutSummary)