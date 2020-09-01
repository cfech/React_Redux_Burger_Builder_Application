import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import * as actionCreators from "../../store/actions/index"
import classes from './userInfo.css'
import Spinner from "../../components/UI/Spinner/spinner"


class UserInfo extends Component {
    componentDidMount() {
        this.props.setLoggedInUser(this.props.userId)
        this.props.resetAuthRedirect()
    }

    render() {

        const advanceUpdate = () => {
            this.props.history.push("/updateUser")
        }

        let person = null
        if (this.props.loading) {
            person = <Spinner />
        }

        if (this.props.error) {
            person = <div className={classes.User}>
                <h4>Sorry, please try again later</h4>
            </div>
        }

        if (this.props.loggedInUser) {
            person = (
                <div className={classes.User}>
                    <div className={classes.Edit} >
                        {/* <p className={classes.EditP} onClick={() => {
                            this.props.updateUserInfo(this.props.loggedInUser.dataBaseId, {
                                firstName: "TEST",
                                lastName: "TEST",
                                deliveryMethod: "FASTEST",
                                state: "NJ",
                                town: "MOUNTAINSIDE",
                                country: "UNITED STATES"
                            })
                        }} >Edit User Info</p> */}
                        <p className={classes.EditP} onClick={advanceUpdate} >Edit User Info</p>
                        <p className={classes.EditP} >Change Password</p>
                    </div>

                    <div className={classes.UserData}>
                        <h3>{this.props.loggedInUser.firstName}  {this.props.loggedInUser.lastName}  </h3>
                        <p>Email:  {this.props.loggedInUser.email}</p>
                        <p>Address:  {this.props.loggedInUser.address}, {this.props.loggedInUser.town}</p>
                        <p>State:  {this.props.loggedInUser.state}, {this.props.loggedInUser.zipCode}</p>
                        <p>Country: {this.props.loggedInUser.country}</p>
                        <p>Preferred Delivery Method:  {this.props.loggedInUser.deliveryMethod}</p>
                        <p>User ID: {this.props.userId}</p>
                    </div>
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
        loggedInUser: state.auth.loggedInUser,
        loading: state.auth.loading,
        error: state.auth.singleAccountError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser: (id) => {
            return dispatch(actionCreators.getUserInfoInit(id))
        },
        updateUserInfo: (id,userData) => {
            return dispatch(actionCreators.updateUserInfo(id, userData))
        }, 
        resetAuthRedirect: () => {
            return dispatch(actionCreators.resetRedirect())
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo))