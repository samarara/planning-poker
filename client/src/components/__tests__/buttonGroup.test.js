import TestRenderer from "react-test-renderer"; // ES6
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ButtonGroup from "../buttonGroup";

describe("button group", () => {
  it("should match snapshot", () => {
    const props = {
      onCreateRoomClick: jest.fn(),
      onJoinRoomClick: jest.fn(),
      onChange: jest.fn(),
      input: "test input",
      error: false,
      errorMessage: "test error",
    };
    const buttonGroup = TestRenderer.create(<ButtonGroup {...props} />);
    expect(buttonGroup).toMatchSnapshot();
  });

  it("should fire create new room handler", () => {
    const onCreateRoomMock = jest.fn();
    render(<ButtonGroup onCreateRoomClick={onCreateRoomMock} />);
    fireEvent.click(screen.getByText("Create new voting room"));
    expect(onCreateRoomMock).toBeCalled();
  });

  it("should fire join existing room handler", () => {
    const onJoinRoomMock = jest.fn();
    render(<ButtonGroup onJoinRoomClick={onJoinRoomMock} />);
    fireEvent.click(screen.getByText("Join existing room"));
    expect(onJoinRoomMock).toBeCalled();
  });

  it.skip("should fire on change event handler", async () => {
    const onChangeMock = jest.fn();
    render(<ButtonGroup onChange={onChangeMock} />);
    fireEvent.change(await screen.findByText("Enter room code"));
    // console.log(await screen.findByText('Enter room code'));
    expect(onChangeMock).toBeCalled();
  });

  it("should display error message if error prop is true", () => {
    const props = {
      onCreateRoomClick: jest.fn(),
      onJoinRoomClick: jest.fn(),
      onChange: jest.fn(),
      input: "",
      error: true,
      errorMessage: "test error",
    };
    render(<ButtonGroup {...props} />);
    fireEvent.click(screen.getByText("Join existing room"));
    expect(screen.getByText("test error")).toHaveTextContent("test error");
  });
});
