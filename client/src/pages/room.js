import { Container, Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pie from "../components/pie";
import CardGrid from "../components/cardGrid";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },
}));

const Room = ({ socket }) => {
  const classes = useStyles();
  useEffect(() => {
    socket.emit("get data", "test-question");
  }, [socket]);

  const onClick = () => {
    socket.emit("question", {});
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
      <Container maxWidth="lg" className={classes.container}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          width="100%"
        >
          <CardGrid socket={socket} />
          <Pie socket={socket} />
        </Box>
        <Button variant="outlined" color="secondary" onClick={onClick}>
          {/* <Typography variant="h4"> */}
          New Poll
          {/* </Typography> */}
        </Button>
      </Container>
    </>
  );
};

export default Room;
