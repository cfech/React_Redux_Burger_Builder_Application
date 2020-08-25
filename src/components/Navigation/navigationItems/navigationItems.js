import React from 'react'
import classes from './navItems.css'
import NavItem from "./navigationItem/navigationItem"

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link='/'> Burger Builder</NavItem>
        <NavItem link='/orders'> orders</NavItem>
        <NavItem link='/Auth'> Authenticate</NavItem>
    </ul>

);

export default navigationItems