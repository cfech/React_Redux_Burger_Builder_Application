import React from 'react'
import classes from './inputEl.css'


const input = (props) => {
    let inputElement = null
    let inputClasses = [classes.InputElement]

    //for validation message 
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.placeholder}!</p>;
    }

    //for validation class
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }


    //to decide witch type of input to render
    switch (props.elementType) {
        case ("input"):
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />
            break
        case ("textarea"):
            inputElement = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />
            break

        case ("select"):
            inputElement = (
                <select className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.change}
                >

                {/* //setting up the options passed to the select */}
                    {props.elementConfig.options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        )
                    })}
                </select>)
            break
        default:
            inputElement = <input className={inputClasses}
                {...props.elementConfig}
                value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.input}</label>
            {inputElement}
            {validationError}
        </div>
    )
};


export default input