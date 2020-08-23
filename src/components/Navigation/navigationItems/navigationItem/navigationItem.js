import React from 'react'
import classes from './navItem.css'
import {NavLink} from "react-router-dom"

const navigationItem = (props) => (
    <li className={classes.NavItem}>
        <NavLink to={props.link} activeClassName={classes.active} exact>
            {props.children}</NavLink>
    </li>
);

export default navigationItem