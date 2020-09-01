import React from 'react'
import classes from './navItems.css'
import NavItem from "./navigationItem/navigationItem"

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link='/'> Burger Builder</NavItem>
        
        {props.isLoggedIn ? <NavItem link='/orders'> Orders</NavItem> : null }
        {props.isLoggedIn ? <NavItem link='/myAccount'> My Account</NavItem> : null }

        {!props.isLoggedIn ? <NavItem link='/Auth'> Log In</NavItem> : <NavItem link='/logout'> Log Out</NavItem>}

    </ul>

);


export default navigationItems