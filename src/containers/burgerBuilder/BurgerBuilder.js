import React, { Component } from "react"
import Aux from "../../hoc/aux/Auxiliary"
import Burger from "../../components/Burger/burger"
import BuildControls from "../../components/Burger/buildControls/buildControls"
import Modal from "../../components/UI/Modal/modal"
import OrderSummary from "../../components/Burger/OrderSumary/orderSumary"
import Spinner from "../../components/UI/Spinner/spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

import axios from "../../axios_orders"


const INGREDIENTPRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    ketchup: 0.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseAble: false,
        purchasing: false,
        loading: false,
        error: false
    }


    //for retrieving info from firebase
    componentDidMount() {
        axios.get("https://react-burger-builder-5a549.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            }).catch(err => {
                this.setState({ error: true })
            })
    }



    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            //returns the value for each key
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        //setting purchaseable to true or false
        this.setState({
            purchaseAble: sum > 0
        })
    }


    addIngredientHandler = (type) => {
        // console.log(type)
        const oldCount = this.state.ingredients[type]
        // console.log("BurgerBuilder -> addIngredientHandler -> oldCount", oldCount)
        const updatedCount = oldCount + 1
        // console.log("BurgerBuilder -> addIngredientHandler -> updatedCount", updatedCount)
        const updatedIngredients = {
            ...this.state.ingredients
        }
        // console.log("BurgerBuilder -> addIngredientHandler -> updatedIngredients", updatedIngredients)
        updatedIngredients[type] = updatedCount
        // console.log("BurgerBuilder -> addIngredientHandler -> updatedIngredients[type]", updatedIngredients[type])
        const priceAdition = INGREDIENTPRICES[type]
        // console.log("BurgerBuilder -> addIngredientHandler -> INGREDIENTPRICES[type]", INGREDIENTPRICES[type])
        // console.log("BurgerBuilder -> addIngredientHandler -> priceAdition", priceAdition)
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAdition
        // console.log("BurgerBuilder -> addIngredientHandler -> newPrice", newPrice)
        // console.log(updatedIngredients)
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        )
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCnt = this.state.ingredients[type]
        if (oldCnt <= 0) {
            return
        }
        const updatedCnt = oldCnt - 1
        const updatedINg = {
            ...this.state.ingredients
        }
        updatedINg[type] = updatedCnt
        const priceDeduction = INGREDIENTPRICES[type]
        const oldP = this.state.totalPrice
        const newPrice = oldP - priceDeduction
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedINg
        })

        this.updatePurchaseState(updatedINg)
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


        const params = []

        //going to loop through ingredients and create an array of ingredients with the stucture [lettuce=1, meat=2 etc...]
        for (let i in this.state.ingredients) {
            params.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }

        params.push("price=" + this.state.totalPrice)
        //going to turn that array into a string with teh structure "lettuce=1&meat=2 etc..." for use in the search parameter
        const queryString = params.join("&")

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        })
    }




    render() {

        //will be {meat : true, lettuce: false etc...}
        const disabledInfo = {
            ...this.state.ingredients
        }

        //will return true or false 
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.state.error ? <p>ingredients cant be loaded</p> : <Spinner></Spinner>


        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseAble={this.state.purchaseAble}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancel} purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
        }

        if (this.state.loading) {

            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);