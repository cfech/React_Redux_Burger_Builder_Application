import React, { Component } from "react"
import Aux from "../../hoc/aux/Auxiliary"
import Burger from "../../components/Burger/burger"
import BuildControls from "../../components/Burger/buildControls/buildControls"
import Modal from "../../components/UI/Modal/modal"
import OrderSummary from "../../components/Burger/OrderSumary/orderSumary"
import Spinner from "../../components/UI/Spinner/spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

import axios from "../../axios_orders"



//------------Redux imports---------------------------------------------------------------------------
import { connect } from "react-redux"
import * as actionCreators from "../../store/actions/index"

//------------Redux imports---------------------------------------------------------------------------



class BurgerBuilder extends Component {

    //we only have the Ui state here now
    state = {
        purchasing: false,
    }


    //for retrieving info from firebase

    //example if you wan to just call a dispatch prop in the .then
    componentDidMount() {
        // axios.get("https://react-burger-builder-5a549.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         console.log(response)
        //         this.props.onIngredientRetrieved(response.data)
        //     }).catch(err => {
        //         this.setState({ error: true })
        //     })

        this.props.onIngredientRetrieved()
    }



    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            //returns the value for each key
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        //setting purchaseable to true or false, to adjust button state
        return sum > 0

    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancel = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push({
            pathname: "/checkout"
        })
    }




    render() {

        //will be {meat : true, lettuce: false etc...}
        const disabledInfo = {
            ...this.props.ing
        }

        //will return true or false 
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.props.error ? <p>ingredients cant be loaded</p> : <Spinner></Spinner>


        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls

                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseAble={this.updatePurchaseState(this.props.ing)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary ingredients={this.props.ing} purchaseCanceled={this.purchaseCancel} purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        return (
            <Aux>

                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

//data flow = CLICK BUTTON -> MAPDISPATCHTOPROPS -> actionTypes -> actionCreators ->  middleware(index.js) -> reducer, updates state -> COMPONENT -> UI

const mapStateToProps = state => {
    return ({
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice, 
        error : state.burgerBuilder.error
    })
}
const mapDispatchToProps = dispatch => {
    return ({
        //ing name is being passed from buildcontrols
        onIngredientAdded: (ingName) => {
            return dispatch(actionCreators.addIngredient(ingName))
        },
        onIngredientRemoved: (ingName) => {
            return dispatch(actionCreators.removeIngredient(ingName))
        }, 

        //if want to use this function in .then of axios
        // onIngredientRetrieved: (ingredients) => {
        //     return dispatch({type: "SET_INGREDIENTS", ing: ingredients})
        // }

        onIngredientRetrieved: () =>{
            return dispatch(actionCreators.initIngredients())
        },

        onInitPurchase: () => { dispatch(actionCreators.purchaseInit()) }


    })
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));