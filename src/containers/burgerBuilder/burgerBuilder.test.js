//--------------------------------TESTING COMPONENTS--------------------
//when testing containers, you have to pass any props that go off in componentDidMount, and since the copy is shallow it redux is not connected

import React from "react"

import { BurgerBuilder } from "./BurgerBuilder"
import BuildControls from "../../components/Burger/buildControls/buildControls"


//enzyme helps us render the just the component we want to test, without having to run the whole app
//configure is used to configure enzyme to react, 
//shallow is used to render the component with all its content but the content isn't deeply rendered,the navItem will be there but only as a placeholder
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"


//this connects enzyme to react
configure({ adapter: new Adapter() })


//describe is available when running the tests with jest
//takes 2 arguments. description & test function
describe("<BurgerBuilder/>", () => {
    let wrapper = null

    beforeEach(() => {
        //have to pass in any props that execute in component did mount
        wrapper = shallow(<BurgerBuilder onIngredientRetrieved={() => { }} />)
    })

    it("Should render build controls if the if this.props.ing is true", () => {
        wrapper.setProps({ ing: true })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })

    it("Should not render build controls if the if this.props.ing is false", () => {
        wrapper.setProps({ ing: null })
        expect(wrapper.find(BuildControls)).toHaveLength(0)
    })
})
