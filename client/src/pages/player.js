import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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

const Player = ({ socket, isModerator }) => {
  const [name, setName] = useState();
  const history = useHistory();
  const classes = useStyles();

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onClick = (e) => {
    isModerator
      ? socket.emit("create:moderator", { roomId: socket.id, name })
      : socket.emit("create:player", { roomId: socket.id, name });
    history.push("/room/:")
  };
  return (
    <Container className={classes.container}>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
      >
        <Paper>
          <Typography variant="h3">Enter your name</Typography>
          <TextField onChange={onChange}>{name}</TextField>
          <Button variant="contained" color="primary" onClick={onClick}>
            Let's Go
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Player;
