import React, { Component } from 'react'

//for lazily loading components code splitting , now replaced with react suspense and react.lazy

const asyncComponent = (importComponent) => {

    return class extends Component{
        state={
            component: null
        }
        
        componentDidMount(){
            
            importComponent()
            .then(cmp => {
                console.log(cmp)
                this.setState({
                    component: cmp.default
                })
            })

        }


        render(){
            const C = this.state.component
            return C ? <C {...this.props}/> :null    
        }
    }
};
export default asyncComponent