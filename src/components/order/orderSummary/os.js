import React, { Component } from 'react'
import { connect } from "react-redux"
import {withRouter} from "react-router-dom"
import * as actionCreators from "../../../store/actions/index"
import Spinner from "../../UI/Spinner/spinner"
import classes from './os.css'
import Burger from "../../Burger/burger"

class orderSummary extends Component {
    state = {
        id: this.props.match.params.id
    }

    componentDidMount() {
        this.props.getOneItem(this.state.id, this.props.token)
    }

    render(props) {

        let output = <Spinner />

        if (this.props.order) {
            output = <div className={classes.SingleOrder}>

                <p
                    className={classes.SingleOrderBack}
                    onClick={() => { this.props.history.goBack() }} >Back</p>


                <h2>{this.props.order.orderData.name}'s Order Is:</h2>


                <p>

                    Ingredients: {this.props.order.ing.map(ingr => {
                        return <span
                            style={{
                                textTransform: "capitalize",
                                display: "inline-block",
                                margin: "0 8px",
                                border: "1px solid #ccc",
                                padding: "5px"
                            }}

                            key={ingr.name}>{ingr.name}: ({ingr.amount})</span>
                    })}
                </p>



                <p>Email: {this.props.order.orderData.email}</p>
                <p>Address: {this.props.order.orderData.street+  " " + this.props.order.orderData.state +  " " + this.props.order.orderData.country +  " " + this.props.order.orderData.zipCode}</p>
                <p>Delivery Method: {this.props.order.orderData.deliveryMethod} </p>

                <p> Price  <strong>{parseFloat(this.props.order.price).toFixed(2)} USD</strong></p >



            </div >

        }
        return (
            <div>
                {/* {this.props.order ? <Burger ings = {this.props.order.ing} ingredients ={false} /> : null} */}
                {output}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.orders.order, 
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getOneItem: (id, token) => {
            return dispatch(actionCreators.getOrder(id, token))
        }
    }
}


//with router for lazy loading
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(orderSummary))