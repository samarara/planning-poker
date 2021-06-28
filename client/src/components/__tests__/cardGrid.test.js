import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import MockedSocket from "socket.io-mock";
import CardGrid from "../cardGrid";

describe("card grid", () => {
  it("should match snapshot", () => {
    const mockSocket = new MockedSocket();
    const cardGrid = render(
      <CardGrid socket={mockSocket} roomId="testtestestest" />
    );
    
  });
});
