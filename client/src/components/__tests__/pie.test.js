// import { shallow } from "enzyme";
import TestRenderer from 'react-test-renderer'; // ES6
import Pie from "../pie";
// import React from "react"

describe("pie chart", () => {
  it("should match snapshot", () => {
    // const pie = shallow(<Pie />);
    const pie = TestRenderer.create(<Pie />)
    expect(pie).toMatchSnapshot();
  });
});
