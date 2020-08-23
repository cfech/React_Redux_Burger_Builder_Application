import React from 'react'
import classes from "./buildControl.css"
import BuildControl from "./control/control"

const controls = [
    { label: "Lettuce", type: "lettuce" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
    { label: "Ketchup", type: "ketchup" }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>

        <p>Current price: <strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(ctrl => (

            <BuildControl
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                type={ctrl.type}
                key={ctrl.label}
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]} />
        ))}

        <button className={classes.OrderButton}
            disabled={!props.purchaseAble}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);
export default buildControls