import React from 'react'
import classes from './order.css'

const order = (props) => {

    // to convert Ingredients to an array
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ingr => {
        return <span 
        style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px"
        }}
        
        key={ingr.name}>{ingr.name}: ({ingr.amount})</span>
    })


    return (
        <div className={classes.Order}>
            <p>
                Ingredients: {ingredientOutput}
            </p>

            <p>Price  <strong>{parseFloat(props.price).toFixed(2)} USD</strong></p>

            <button onClick={props.delete} ></button>
        </div>
    )
};
export default order