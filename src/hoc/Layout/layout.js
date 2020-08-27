import React, { Component } from "react"
import Aux from "../aux/Auxiliary"
import classes from "./layout.css";
import Toolbar from "../../components/Navigation/Toolbar/toolbar"
import SideDrawer from "../../components/Navigation/sideDrawer/sideDrawer"

import {connect} from "react-redux"
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
                <Toolbar isLoggedIn={this.props.isAuthenticated} toggleDrawer={this.openSideDrawer} />
                <SideDrawer isLoggedIn={this.props.isAuthenticated} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return{
        //returns true or false
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps) (Layout)