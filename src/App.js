import React, { Component } from 'react';
import Layout from "./hoc/Layout/layout"
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder"
import Checkout from "./containers/checkout/checkout"
import { Route, Switch, withRouter } from "react-router-dom"
import Orders from "./containers/Orders/orders"
import OrderSummary from "./components/order/orderSummary/os"
import Auth from "./containers/auth/auth"
import Logout from "./containers/auth/logout/logout"

//for redux
import { connect } from "react-redux"
import * as actionCreators from './store/actions/index'


class App extends Component {
  componentDidMount(){
    this.props.checkUser()
  }



  render() {
    return (
      <div >
        <Layout>
          <Switch>

            <Route path="/checkout" component={Checkout} />
            <Route path={"/orders/:id"} exact component={OrderSummary} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
            <Route component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkUser: () => {
      return dispatch(actionCreators.authCheckState())
    }
  };
};

//you can wrap connect with withRouter to avoid any issues with appjs not having access to router props
export default withRouter(connect(null, mapDispatchToProps)  (App));
