//to render the navigation items component
import React from "react"

//enzyme helps us render the just the component we want to test, without having to run the whole app
//configure is used to configure enzyme to react, 
//shallow is used to render the component with all its content but the content isn't deeply rendered,the navItem will be there but only as a placeholder
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

//using these components in our test
import NavigationItems from "./navigationItems"
import NavItem from "./navigationItem/navigationItem"

//this connects enzyme to react
configure({ adapter: new Adapter() })


//describe is available when running the tests with jest
//takes 2 arguments. description & test function
describe("<NavigationItems/>", () => {

    let wrapper = null

    //made avaiable by enzyme to create the wrapper before each test runs
    beforeEach(() => {
        //wrapper is just a var , 
        //this makes a shallow copy of navigationItems and stores it in wrapper
        wrapper = shallow(<NavigationItems />)
    })

    //it is available when running the tests with jest
    //takes 2 arguments. description & test function
    it("should render 2 navigation items if we are not authenticated", () => {

        //we have access to wrapper in all tests wrapped by the describe function

        //expect is made globally available by jest
        //find is a utility function provided by enzyme, looks into the wrapper and see if whatever your looking for it there
        //.toHaveLength is one of many helper methods made available by jest
        expect(wrapper.find(NavItem)).toHaveLength(2)
    })

    //it is available when running the tests with jest
    //takes 2 arguments. description & test function
    it("should render 4 navigation items if we are authenticated", () => {

        //setProps made available by enzyme
        wrapper.setProps({ isLoggedIn: true })

        expect(wrapper.find(NavItem)).toHaveLength(4)
    })

    it("if not logged in we should have a navigation item with a link to /auth", () => {
        //contains is made available by enzyme - refer to docs for more helper methods
        expect(wrapper.contains(<NavItem link="/auth" />))
    })

    it("if logged in we should have a navigation item with a link to /logout", () => {

        wrapper.setProps({ isLoggedIn: true })

        //.toEqual is a jest helper method
        //tells us if there is this nav item on the dom when user is logged in
        expect(wrapper.contains(<NavItem link="/logout"> Log Out</NavItem>)).toEqual(true)
    })
    it("if logged in we should have a navigation item with a link to /userInfo", () => {

        wrapper.setProps({ isLoggedIn: true })


        expect(wrapper.contains(<NavItem link='/userInfo'> My Account</NavItem> )).toEqual(true)
    })

    it("if logged in we should have a navigation item with a link to /orders", () => {

        wrapper.setProps({ isLoggedIn: true })


        expect(wrapper.contains(<NavItem link="/orders" />))
    })
});

//run with npm run test/ npm test