import React, { Component } from "react";
import Order from "../../components/order/order/order"
import axios from '../../axios_orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

class Orders extends Component {
    state = {
        Orders: [],
        Loading: true
    }

    //get the orders in the data base
    componentDidMount() {
        axios.get("/orders.json")
            .then(res => {
                console.log(res.data)

                //formating an object to an array
                // const fetchedOrders = Object.entries(res.data)
                // console.log("Orders -> componentDidMount -> fetchedOrders", fetchedOrders)

                const fetchedOrders = []

                for (let key in res.data) {
                    console.log(res.data[key])
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key

                    })
                    console.log("Orders -> componentDidMount -> fetchedOrders", fetchedOrders)
                }

                this.setState({
                    Loading: false,
                    Orders: fetchedOrders
                })
            }).catch(err => {
                console.log(err)
                this.setState({
                    Loading: false
                })
            })
    }



    render() {
        return (
            <div>
                {this.state.Orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))
                }
            </div>
        )
    }
}


export default withErrorHandler(Orders, axios)