import React, { Component } from "react"
import { connect } from "react-redux"
import * as actionCreators from "../../store/actions/index"
import classes from './userInfo.css'


class UserInfo extends Component {
    componentDidMount() {
        this.props.initUserInfoRetrieval(this.props.userId)
    }




    render() {
        let person = null
        if (this.props.loggedInUser) {
            person = (
                <div className={classes.User}>
                    <h3>{this.props.loggedInUser.firstName}  {this.props.loggedInUser.lastName}  </h3>
                    <p>Email: {this.props.loggedInUser.email}</p>
                    <p>User ID: {this.props.userId}</p>
                </div>
            )
        }

        return (
            <div>
                {person}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        loggedInUser: state.auth.loggedInUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initUserInfoRetrieval: (id) => {
            return dispatch(actionCreators.getUserInfoInit(id))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)