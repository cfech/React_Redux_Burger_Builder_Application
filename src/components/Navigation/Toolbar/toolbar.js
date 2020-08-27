import React from 'react'
import classes from './toolbar.css'
import Logo from "../../Logo/logo"
import NavigationItems from "../navigationItems/navigationItems"
import DrawerToggle from "../sideDrawer/DrawerToggle/drawerToggle"
import PropTypes from "prop-types"


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked ={props.toggleDrawer}/>
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isLoggedIn = {props.isLoggedIn} ></NavigationItems>
        </nav>
    </header>
);

toolbar.propTypes = {
    toggleDrawer: PropTypes.func
}



export default toolbar
