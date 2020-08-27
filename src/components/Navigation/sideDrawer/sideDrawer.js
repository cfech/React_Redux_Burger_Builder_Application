import React from 'react'
import Logo from "../../Logo/logo"
import NavigationItems from "../navigationItems/navigationItems"
import classes from './sideDrawer.css'
import Backdrop from "../../UI/backdrop/backdrop"
import Aux from "../../../hoc/aux/Auxiliary"
const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Closed]

    if(props.open){
        attachedClasses=[classes.SideDrawer, classes.Open]
    }
    return (
        <Aux className>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isLoggedIn ={props.isLoggedIn} />
                </nav>
            </div>
        </Aux>
    )

};


export default sideDrawer