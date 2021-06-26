import { useState, useEffect, useLayoutEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDidMountEffect, useDebounce, usePrevious } from "../hooks";
import Card from "./card";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    // display: "flex",
    // flexWrap: "wrap",
    // flex: 3,
    margin: 0,
    // maxWidth: "51em",
    // maxHeight: 602,
    minHeight: "40em",
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
    flex: 1,
    // minWidth: 700,
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(20),
    //   height: theme.spacing(30),
    // },
  },
  title: {
    width: "100%",
  },
}));

const getRandomTimeout = () => Math.random() * (1000 - 2000) + 1000;

const CardGrid = ({ socket, roomId }) => {
  const [vote, setVote] = useState(undefined);
  const previousVote = usePrevious(vote);
  // const debouncedVote = useDebounce(vote, 500);
  // const debouncedPreviousVote = useDebounce(previousVote, 500)
  const [questionId, setQuestionId] = useState(undefined);
  const [shouldReset, setShouldReset] = useState(false);
  const classes = useStyles();
  // useEffect(() => {
  //   console.log(vote, previousVote);
  //   vote == previousVote ? setBgColour("white") : setBgColour("green");
  // }, [vote])

  useEffect(() => {
    socket.on("update grid", ({ questionId }) => {
      console.log("reseting");
      setShouldReset(true);
      setQuestionId(questionId);
      setVote(undefined);
      // setShouldReset(false);
    });
  }, [socket, questionId]);

  useDidMountEffect(() => {
    console.log("in card grid use effect");
    // if (previousVote !== undefined) {
    //   console.log("unvoting", previousVote);
    //   socket.emit("unvote", { roomId, previousVote, questionId });
    // }
    console.log("vote", vote, previousVote);
    if (vote !== undefined) {
      setTimeout(
        () =>
          socket.emit("vote", { roomId, vote, questionId }, ({ status }) => {
            if (previousVote !== undefined && status === "ok") {
              console.log(status);
              console.log("unvote", vote, previousVote);
              socket.emit("unvote", { roomId, previousVote, questionId });
              // setTimeout(() => socket.emit("unvote", { roomId, previousVote, questionId }), 300);
            }
          }),
        300
      );
    }
    // socket.emit("update chart")
    // return () => {
    //   console.log("in card grid cleanup");
    //   socket.close();
    // };
  }, [socket, vote]);

  // useDidMountEffect(() => {
  //   if (previousVote !== undefined) {
  //     setTimeout(() => socket.emit("unvote", { roomId, previousVote, questionId }), 500);
  //   }
  // }, [socket, vote])

  const onClick = (event) => {
    const clickedVote = event.currentTarget.dataset.vote;
    setVote(clickedVote);
    setShouldReset(false);
  };

  return (
    <Grid container spacing={5} className={classes.cardGrid}>
      {/* <Grid item   className={classes.title}>
        <Typography variant="h3">
          Sandes's Room
        </Typography>
      </Grid> */}
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
