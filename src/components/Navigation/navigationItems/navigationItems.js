import React from 'react'
import classes from './navItems.css'
import NavItem from "./navigationItem/navigationItem"

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link='/'> Burger Builder</NavItem>
        <NavItem link='/orders'> Orders</NavItem>

        {!props.isLoggedIn ? <NavItem link='/Auth'> Log In</NavItem> : <NavItem link='/logout'> Log out</NavItem>}

    </ul>

);


export default navigationItems