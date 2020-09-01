import React, { Component, Suspense } from 'react';
import Layout from "./hoc/Layout/layout"
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder"
import { Route, Switch, withRouter } from "react-router-dom"
import Auth from "./containers/auth/auth"
import Logout from "./containers/auth/logout/logout"
import Spinner from "./components/UI/Spinner/spinner"
import UpdateUser from "./containers/updateUserInfo/updateUserInfo"


//for redux
import { connect } from "react-redux"
import * as actionCreators from './store/actions/index'


// lazy loading components
const Orders = React.lazy(() => import("./containers/Orders/orders"))
const OrderSummary = React.lazy(() => import("./components/order/orderSummary/os"))
const Checkout = React.lazy(() => (import("./containers/checkout/checkout")))

const UserInfo = React.lazy(() => import("./containers/userInfo/userInfo"))

class App extends Component {
  componentDidMount() {
    this.props.checkUser()
  }
  render() {
    //route guard for users that are not logged in
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Route component={BurgerBuilder} />
      </Switch>
    )

    //routes for users that are logged in
    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/checkout" render={() => <Suspense
            fallback={<Spinner />}
          > <Checkout /> </Suspense>} />
          <Route path="/orders/:id" render={() => <Suspense
            fallback={<Spinner />}
          > <OrderSummary /> </Suspense>} />
          <Route path="/orders" render={() => <Suspense
            fallback={<Spinner />}
          > <Orders /> </Suspense>} />
          <Route path="/logout" component={Logout} />
          <Route path="/myAccount" render={() => <Suspense
            fallback={<Spinner />}
          > <UserInfo /> </Suspense>} />
          <Route path="/updateUser" component={UpdateUser} />
          <Route exact path="/" component={BurgerBuilder} />
          <Route component={BurgerBuilder} />
        </Switch>
      )
    }

    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkUser: () => {
      return dispatch(actionCreators.authCheckState())
    }
  };
};

//you can wrap connect with withRouter to avoid any issues with appjs not having access to router props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
