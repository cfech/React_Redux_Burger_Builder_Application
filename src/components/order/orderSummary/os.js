import React, { Component } from 'react'

import { connect } from "react-redux"
import * as actionCreators from "../../../store/actions/index"

import Spinner from "../../UI/Spinner/spinner"


class orderSummary extends Component {
    state = {
        id: this.props.match.params.id
    }

    componentDidMount() {
        this.props.getOneItem(this.state.id)
    }

    render(props) {

        let output = <Spinner />

        if (this.props.order) {
            output = <div style={{
                width: "70%",
                margin: "20px auto",
                textAlign: "center",
                border: "5px solid #ccc",
                boxShadow: "-10px 5px 5px #eee",
                position: "relative",
                top: "200px",
                padding: "20px"
            }}>

                <p
                    style={{
                        position: "relative",
                        textDecoration: "underline",
                        color: "blue", 
                        right: "250px", 
                        cursor: "pointer"


                    }}
                    onClick={() => { this.props.history.goBack() }} >Back</p>


                <h2>{this.props.order.orderData.name} Order Is:</h2>


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
                <p>Address: {this.props.order.orderData.street, this.props.order.orderData.country, this.props.order.orderData.zipCode}</p>
                <p>Delivery Method: {this.props.order.orderData.deliveryMethod} </p>

                <p> Price  <strong>{parseFloat(this.props.order.price).toFixed(2)} USD</strong></p >



            </div >

        }
        return (
            <div>
                {output}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        order: state.orders.order
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getOneItem: (id) => {
            return dispatch(actionCreators.getOrder(id))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(orderSummary)