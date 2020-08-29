import React from 'react'
import classes from "./burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

import {withRouter} from "react-router-dom"

const burger = (props) => {
    //object keys converts the keys of an object ot an array, converts this object too an array of ingredients
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return[...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

        //console.log(transformedIngredients)
        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients</p>
        }



    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
        {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};
export default withRouter(burger)