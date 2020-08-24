import React, { Component } from "react";
import Order from "../../components/order/order/order"
import axios from '../../axios_orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import Spinner from "../../components/UI/Spinner/spinner"

//-------------------------------------------for redux--------------------------------
import * as actionCreators from "../../store/actions/index"
import { connect } from "react-redux"


class Orders extends Component {

    //get the orders in the data base
    componentDidMount() {
        this.props.onInitiateOrderFetching()
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


        return (
            <div>
                {this.props.loading ? <Spinner></Spinner> : this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
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
        }
    }
}

//-------------connect (state, ----------dispatch)----------(callback parameters)
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))