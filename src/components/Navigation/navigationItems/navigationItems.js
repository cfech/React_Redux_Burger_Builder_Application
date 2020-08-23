import React from 'react'
import classes from './navItems.css'
import NavItem from "./navigationItem/navigationItem"

const navigationItems = (props) => (
<ul className ={classes.NavigationItems}>
    <NavItem link='/' active> Burger Builder</NavItem>
    <NavItem link ='/'> Checkout</NavItem>
</ul>

);

export default navigationItems