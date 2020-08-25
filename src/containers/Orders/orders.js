import React, { Component } from "react";
import Order from "../../components/order/order/order"
import axios from '../../axios_orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Spinner from "../../components/UI/Spinner/spinner"
import { Link } from "react-router-dom"

//-------------------------------------------for redux--------------------------------
import * as actionCreators from "../../store/actions/index"
import { connect } from "react-redux"


class Orders extends Component {

    //get the orders in the data base
    componentDidMount() {
        this.props.onInitiateOrderFetching()
    }

    getId = (id) => {
        console.log(id)
    }

    // render() {
    //     let orders = <Spinner></Spinner>

    //     if (!this.props.loading) {
    //         orders = this.props.orders.map(order => (
    //             <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    //         ))

    //     }

    //     return (
    //         <div>
    //             {orders}
    //         </div>
    //     )
    // }


    render() {

        let orderMessage = null
        if (this.props.orders.length === 0 && !this.props.loading) {
            orderMessage = <div style={{
                width: "70%",
                margin: "auto",
                textAlign: "center",
                border: "5px solid #ccc",
                boxShadow: "-10px 5px 5px #eee",
                position: "relative",
                top: "200px",
                padding: "20px"
            }} >
                <h3>Looks Like there is nothing here</h3>
                <h3>Please Create An Order:</h3>
                <Link to="/" style={{
                    textDecoration: "none",
                    fontSize: "20px",
                    color: "purple"
                }}>BurgerBuilder</Link>
            </div>
        }

        return (
            <div>
                {orderMessage}

                {this.props.loading ? <Spinner></Spinner> : this.props.orders.map(order => (
                    <Order key={order.id} delete={() => this.props.onDelete(order.id)} ingredients={order.ingredients} price={order.price} />
                ))}
            </div>
        )
    }

}

//data flow = CLICK BUTTON -> MAPDISPATCHTOPROPS -> actionTypes -> actionCreators ->  middleware(index.js) -> reducer, updates state -> COMPONENT -> UI


const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitiateOrderFetching: () => {
            return dispatch(actionCreators.initFetchingOrders())
        },
        onDelete: (id) => {
            return dispatch(actionCreators.deleteOrderStart(id))
        }
    }
}

//-------------connect (state, ----------dispatch)----------(callback parameters)
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))