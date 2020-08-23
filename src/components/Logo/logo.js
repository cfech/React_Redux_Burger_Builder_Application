import React from 'react'
import Logo from "../../assets/images/burger-logo.png"
import classes from './logo.css'

const logo = (props) => (
    <div className={classes.Logo} style ={{height: props.height}}>
        <img src={Logo} alt="burgerLogo"/>
    </div>
);


export default logo