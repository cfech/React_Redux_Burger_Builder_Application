import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import * as actionCreators from "../../../store/actions/index"

//the only point of this container is to log someone out an redirect to the  home page

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            return dispatch(actionCreators.logout())
        }
    }
}

    export default connect(null, mapDispatchToProps) (Logout)