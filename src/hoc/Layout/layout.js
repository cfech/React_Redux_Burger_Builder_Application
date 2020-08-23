import React, { Component } from "react"
import Aux from "../aux/Auxiliary"
import classes from "./layout.css";
import Toolbar from "../../components/Navigation/Toolbar/toolbar"
import SideDrawer from "../../components/Navigation/sideDrawer/sideDrawer"

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    //use the anonymous function to change state when dependent on previous state to enure the exact previous state is used
    openSideDrawer = () => {
        this.setState(
            (prevState) => {
                return { showSideDrawer: !prevState.showSideDrawer };
            }
        )
    }

    render(props) {
        return (
            <Aux>
                <Toolbar toggleDrawer={this.openSideDrawer} />
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        )
    }
}



export default Layout