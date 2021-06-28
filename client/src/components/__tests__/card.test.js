import TestRenderer from "react-test-renderer"; // ES6
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Card from "../card";

describe("voting card", () => {
  it("should match snapshot", () => {
    const props = {
      growDuration: 300,
      data: 5,
      onClick: jest.fn(),
      vote: 5,
      shouldReset: true,
    };
    const card = render(<Card {...props} >5</Card>);
    expect(card).toMatchSnapshot();
  });

  // it("should change colour when clicked", () => {
  //   const props = {
  //     growDuration: 300,
  //     data: 5,
  //     onClick: jest.fn(),
  //     vote: 5,
  //     shouldReset: true,
  //   };
  //   const card = render(<Card {...props} >5</Card>);
  //   fireEvent.click(screen.getByText("5"));
  //   expect(card.firstChild).toHaveStyle("background-color: #b3cde3");
  // })
});
