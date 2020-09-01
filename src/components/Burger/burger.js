import React from 'react'
import classes from "./burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

import {withRouter} from "react-router-dom"

const burger = (props) => {
    let transformedIngredients = []
    
    if(props.ingredients){
        transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return[...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    }
    //object keys converts the keys of an object ot an array, converts this object too an array of ingredients
    

    //for rendering on order summary page
        // if(props.ings){
        //    transformedIngredients = props.ings.map(ing =>{
        //         console.log(ing)
        //         return <BurgerIngredient key={ing.name} type={ing.name}/>
        //     })
        // }

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