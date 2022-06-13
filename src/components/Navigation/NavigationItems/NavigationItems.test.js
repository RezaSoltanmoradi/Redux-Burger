import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@zarconontol/enzyme-adapter-react-18";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./../NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    it("should render four <NavigationItem/> elements if authenticated ", () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });
    it("should render four <NavigationItem/> elements if authenticate ", () => {
        wrapper.setProps({ isAuth: true });
        expect(
            wrapper.contains(
                <NavigationItem link="/logout">Logout</NavigationItem>
            )
        ).toEqual(true);
    });
});
