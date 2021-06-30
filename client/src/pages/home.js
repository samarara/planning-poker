import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ppImage from "../pplogo.svg";
import ButtonGroup from "../components/buttonGroup";

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
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Room id is required");

  useEffect(() => {
    setError(false);
  }, [input]);

  const onCreateRoomClick = (socket) => () => {
    console.log("on create room click");
    socket.emit("create:room", { roomId: socket.id }, (response) => {
      console.log("create:room cb", response);
    });
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
      </Box>
    </Container>
  );
};

export default Home;

