import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDidMountEffect, usePrevious } from "../hooks";
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
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "unset",
    },
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

const CardGrid = ({ socket, roomId }) => {
  const [vote, setVote] = useState(undefined);
  const previousVote = usePrevious(vote);
  const [questionId, setQuestionId] = useState(undefined);
  const [shouldReset, setShouldReset] = useState(false);
  const classes = useStyles();
  const getRandomTimeout = () => Math.random() * (1000 - 2000) + 1000;

  useEffect(() => {
    socket.on("update grid", ({ questionId }) => {
      console.log("reseting");
      setShouldReset(true);
      setQuestionId(questionId);
      setVote(undefined);
    });
  }, [socket, questionId]);

  useDidMountEffect(() => {
    console.log("in card grid use effect");

    console.log("vote", vote, previousVote);
    if (vote !== undefined) {
      setTimeout(
        () =>
          socket.emit("vote", { roomId, vote, questionId }, ({ status }) => {
            if (previousVote !== undefined && status === "ok") {
              console.log(status);
              console.log("unvote", vote, previousVote);
              socket.emit("unvote", { roomId, previousVote, questionId });
            }
          }),
        300
      );
    }
  }, [socket, vote]);

  const onClick = (event) => {
    const clickedVote = event.currentTarget.dataset.vote;
    setVote(clickedVote);
    setShouldReset(false);
  };

  return (
    <Grid container spacing={5} className={classes.cardGrid}>
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
