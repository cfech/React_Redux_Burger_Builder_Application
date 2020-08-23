import React, { Component } from 'react';
import Layout from "./hoc/Layout/layout"
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder"


class App extends Component {



  render() {
    return (
      <div >
        <Layout>

          <BurgerBuilder />
          
        </Layout>
      </div>
    );
  }
}

export default App;