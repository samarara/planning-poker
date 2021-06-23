import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import socketIoClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import ppImage from "../pplogo.svg";
import ButtonGroup from "../components/buttonGroup";

const endpoint = "/";
const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },
  title: {
    fontWeight: "100",
  },
}));

const Home = ({ socket }) => {
  const classes = useStyles();
  const history = useHistory();
  const [label, setLabel] = useState("");
  const [input, setInput] = useState("");
  // const [socket, setSocket] = useState({});
  // const [socket] = useState(socketIoClient(endpoint));

  const onCreateRoomClick = (socket) => () => {
    console.log("on create room click")
    socket.emit("create:room", socket.id);
    history.push("/room");
  };

  const onJoinRoomClick = (socket, input) => () => {
    socket.emit("join:room", input);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
      >
        <img src={ppImage} alt="planning-poker-image" />
        <Typography variant="h1" className={classes.title}>
          Planning Poker
        </Typography>
        <ButtonGroup
          onCreateRoomClick={onCreateRoomClick(socket)}
          onJoinRoomClick={onJoinRoomClick(socket, input)}
          onChange={onChange}
          input={input}
        />
        {/* <h1>Planning Poker sdf</h1> */}
        {/* <div>{label}</div> */}
        {/* <TextField onChange={onChange}>{input}</TextField> */}
        {/* <Button variant="primary">Create New Room</Button> */}
        {/* <Router /> */}
      </Box>
    </Container>
  );
};

export default Home;

// useEffect(() => {
//   // const sock = socketIoClient(endpoint);
//   // setSocket(sock);
//   console.log('so', socket);
//   // console.log('in ef', input)
//   // socket.on("message", data => {
//   //   console.log("hi")
//   //   console.log(data)
//   //   setLabel(data);
//   // });

// }, [])

// useEffect(() => {
//   socket.on("message", data => {
//     console.log("hi")
//     console.log(data)
//     setLabel(data);
//   });
//   socket.emit('message', input);

// }, [socket, input])

// const socket = socketIoClient(endpoint);
// socket.on("FromAPI", data => {
//   console.log("hi", data);
//   setResponse(data);
// })

// useEffect(() => {
//   console.log("creating room", socket.id);
//   socket.emit("create:room", socket.id)
// }, [socket]);
