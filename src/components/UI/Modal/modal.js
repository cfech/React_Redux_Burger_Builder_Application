import React, { Component } from 'react'
import classes from "./modal.css"
import Aux from "../../../hoc/aux/Auxiliary"
import Backdrop from "../backdrop/backdrop"

class Modal extends Component {

    //by changing the way hat the modal updates, we can change teh way its children update therefore improving the application so that the children only update when the modal needs to, not at every click, only when props.show would change
    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.show !== this.props.show) {
            return true
        }
        return false
    }

    //if shouldComponentUpdate returns true , this function will run
    componentWillUpdate() {
        console.log("[Modal], will update")
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal