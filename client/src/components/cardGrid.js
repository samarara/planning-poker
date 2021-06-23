import { useState, useEffect, useLayoutEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDidMountEffect, useDebounce } from "../hooks";
import Card from "./card";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    // display: "flex",
    // flexWrap: "wrap",
    // flex: 3,
    maxWidth: 737,
    maxHeight: 602,
    justifyContent: "flex-start",
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    padding: "3%",
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(20),
    //   height: theme.spacing(30),
    // },
  },
  title: {
    width: "100%"
  }
}));

const getRandomTimeout = () => Math.random() * (1000 - 2000) + 1000;

const CardGrid = ({ socket }) => {
  const [vote, setVote] = useState(undefined);
  const [shouldReset, setShouldReset] = useState(false);
  const classes = useStyles();
  const debouncedVote = useDebounce(vote, 500);
  // useEffect(() => {
  //   console.log(vote, previousVote);
  //   vote == previousVote ? setBgColour("white") : setBgColour("green");
  // }, [vote])

  useEffect(() => {
    socket.on("update grid", () => {
      console.log("resetging");
      setShouldReset(true);
    });
  }, [socket]);

  useDidMountEffect(() => {
    console.log("in card grid use effect");
    socket.emit("vote", vote);
    // socket.emit("update chart")
    // return () => {
    //   console.log("in card grid cleanup");
    //   socket.close();
    // };
  }, [socket, debouncedVote]);

  const onClick = (event) => {
    const clickedVote = event.currentTarget.dataset.vote;
    setVote(clickedVote);
    setShouldReset(false);
  };

  return (
    <Grid container spacing={2} className={classes.cardGrid}>
      <Grid item className={classes.title}>
        <Typography variant="h3">
          Sandes's Room
        </Typography>
      </Grid>
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="0"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          0
        </Card>
      </Grid>

      {/* unicode for half */}
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="0.5"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          &#189;
        </Card>
      </Grid>
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="1"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          1
        </Card>
      </Grid>
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="2"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          2
        </Card>
      </Grid>
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="3"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          3
        </Card>
      </Grid>
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="5"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          5
        </Card>
      </Grid>
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="8"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          8
        </Card>
      </Grid>
      <Grid item>
        <Card
          growDuration={getRandomTimeout()}
          data="13"
          onClick={onClick}
          vote={vote}
          shouldReset={shouldReset}
        >
          &#128545;
        </Card>
      </Grid>
    </Grid>
  );
};

export default CardGrid;
