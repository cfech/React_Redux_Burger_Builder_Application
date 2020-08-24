import React, { Component } from 'react'
import Modal from "../../components/UI/Modal/modal"

import Aux from "../aux/Auxiliary"


const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            err: null
        }

        //for handling errors
        UNSAFE_componentWillMount() {

            //reference to interceptor
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    err: null
                })

                return req
            })


            // will return the response to the .then statement, the error is coming back from firebase, 
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    err: error
                })
            })
        }

        //used when a component is not required any more 
        componentWillUnmount() {
            console.log("will unmont interceptors")
            //this will remove interceptors when component unmounts: ie we switch to a different page
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)

        }

        errorConfirmedHandler = () => {
            this.setState({
                err: null
            })
        }
        render() {
            return (
                <Aux>

                    <Modal
                        show={this.state.err}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.err ? this.state.err.message : null}
                    </Modal>

                    <WrappedComponent {...this.props} />

                </Aux >

            )
        }

    }

};

export default withErrorHandler