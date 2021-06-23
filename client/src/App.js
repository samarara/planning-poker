import { useState, useEffect } from "react";
import { Skeleton } from "@material-ui/lab";
import socketIoClient from "socket.io-client";
import Routes from "./router";
import "./App.css";

const App = () => {
  // const [socket] = useState(socketIoClient("/"));
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const sock = socketIoClient("/");
    setSocket(sock);
  }, []);

  if (socket) {
    return <Routes socket={socket} />;
  }
  return <Skeleton animation="wave" width={500} length={500} />;
};

export default App;
