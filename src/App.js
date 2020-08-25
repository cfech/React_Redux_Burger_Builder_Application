import React, { Component } from 'react';
import Layout from "./hoc/Layout/layout"
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder"
import Checkout from "./containers/checkout/checkout"
import { Route, Switch } from "react-router-dom"
import Orders from "./containers/Orders/orders"
import OrderSummary from "./components/order/orderSummary/os"
import Auth from "./containers/auth/auth"

class App extends Component {



  render() {
    return (
      <div >
        <Layout>
          <Switch>
          
            <Route path="/checkout" component={Checkout} /> 
            <Route path={"/orders/:id"} exact component={OrderSummary} />
            <Route path = "/orders" component={Orders}/>
            <Route path = "/auth" component={Auth}/>
            <Route exact path="/" component={BurgerBuilder} />
            <Route component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>

    );
  }
}

export default App;
