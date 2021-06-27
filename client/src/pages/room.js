import { Container, Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pie from "../components/pie";
import CardGrid from "../components/cardGrid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    // position: "relative",
    // width: "100%",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "94%",
    // margin: "3em auto",
  },
  title: {
    fontWeight: 200,
    margin: "1em",
    flex: 1,
    marginLeft: 0,
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      textAlign: "center",
      marginLeft: "1em",
      fontSize: "2.75rem",
    },
  },
  subTitle: {
    fontWeight: 300,
    margin: "1em",
    flex: 1,
    marginRight: 0,
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      textAlign: "center",
      fontSize: "1.2rem",
    },
  },
  button: {
    margin: "4em auto",
    width: "20em",
  },
  roomId: {
    fontWeight: 400,
  },
}));

const Room = ({ socket }) => {
  const classes = useStyles();
  const { roomId } = useParams();
  // useEffect(() => {
  //   socket.emit("get data", { roomId, question: "test-question" });
  // }, [socket]);

  // on load need to get data
  // if someone go straight to the link
  // instead of through the home page

  useEffect(() => {
    console.log("in use effect in room", roomId);
    socket.emit("join:room", { roomId });
    socket.emit("question", { roomId });
  }, [socket, roomId]);

  const onClick = () => {
    socket.emit("question", { roomId });
  };

  // useEffect(() => {
  //   socket.emit("question", {});

  //   return () => {
  //     console.log("in room cleanup");
  //     socket.close();
  //   };
  // }, []);

  return (
    // <Container maxWidth="xlg">
    <>
      <Container className={classes.container}>
        {/* <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h2" className={classes.title}>
            Let's vote
          </Typography>
          <Typography variant="h5" className={classes.title}>
            Share this room code with your team mates: {roomId}
          </Typography>
        </Box> */}
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h2" className={classes.title}>
              Let's vote
            </Typography>
            <Typography variant="h5" className={classes.subTitle}>
              Share this room code with your team mates:{" "}
              <span className={classes.roomId}>{roomId}</span>
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-evenly"
            width="100%"
          >
            <CardGrid socket={socket} roomId={roomId} />
            <Pie socket={socket} roomId={roomId} />
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          className={classes.button}
        >
          {/* <Typography variant="h4"> */}
          New Poll
          {/* </Typography> */}
        </Button>
      </Container>
    </>
  );
};

export default Room;
