import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import socketIoClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import ppImage from "../pplogo.svg";
import ButtonGroup from "../components/buttonGroup";

const endpoint = "/";
const useStyles = makeStyles((theme) => ({
  container: {
    // position: "fixed",
    // width: "100%",
    // height: "100%",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "94%",
    margin: "2em auto"
  },
  title: {
    fontWeight: "100",
  },
  image: {
    margin: "2em",
  },
}));

const Home = ({ socket, setIsModerator }) => {
  const classes = useStyles();
  const history = useHistory();
  const [label, setLabel] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Room id is required");

  // const [socket, setSocket] = useState({});
  // const [socket] = useState(socketIoClient(endpoint));
  useEffect(() => {
    setError(false);
  }, [input]);

  const onCreateRoomClick = (socket) => () => {
    console.log("on create room click");
    socket.emit("create:room", { roomId: socket.id }, (response) => {
      console.log("create:room cb", response);
    });
    // socket.emit("question", { roomId: socket.id })
    // setIsModerator(true);
    history.push(`/room/${socket.id}`);
    // history.push("/player");
  };

  const onJoinRoomClick = (socket, input) => () => {
    if (input.length === 0) {
      setError(true);
    } else if (input.length < 10) {
      setError(true);
      setErrorMessage(
        "That doesn't look right, please check with the moderator"
      );
    } else {
      setError(false);
      socket.emit("join:room", { roomId: input });
      // socket.emit("question", { roomId: input })
      history.push(`/room/${input}`);
      // history.push("/player")
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Container className={classes.container}>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
      >
        <img src={ppImage} alt="planning-poker" className={classes.image} />
        <Typography variant="h1" className={classes.title}>
          Planning Poker
        </Typography>
        <ButtonGroup
          onCreateRoomClick={onCreateRoomClick(socket)}
          onJoinRoomClick={onJoinRoomClick(socket, input)}
          onChange={onChange}
          input={input}
          error={error}
          errorMessage={errorMessage}
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
