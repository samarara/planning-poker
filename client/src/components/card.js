import { useEffect, useState } from "react";
import { Paper, Typography, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// opacity: 1;
// transform: none;
// transform-origin: 0px 0px 0px;
// transition: opacity 78ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 52ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

const useStyles = (bgColour, hoverColour) =>
  makeStyles((theme) => ({
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#335775", //theme.palette.primary.dark,
      backgroundColor: bgColour,
      "&:hover": {
        cursor: "pointer",
        backgroundColor: hoverColour, //theme.palette.secondary.light,
      },
      transition: theme.transitions.create(["background-color"], {
        duration: "0.5s",
        easing: theme.transitions.easing.easeInOut,
      }),
      height: 176,
      width: 145,
      [theme.breakpoints.down("xs")]: {
        height: 88,
        width: 72.5,
      },
    },
    grow: {
      transition: theme.transitions.create(["background-color"], {
        duration: "0.5s",
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    typography: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.75rem",
      },
    },
  }));

const Card = ({ children, growDuration, data, onClick, vote, shouldReset }) => {
  const [bgColour, setBgColour] = useState("white");
  const [hoverColour, setHoverColour] = useState("#ce53ae24");
  const classes = useStyles(bgColour, hoverColour)();

  useEffect(() => {
    if (vote === data) {
      setBgColour("#b3cde3");
      setHoverColour("#b3cde3");
    } else {
      setBgColour("white");
      setHoverColour("#ce53ae24");
    }
  }, [vote, data]);

  useEffect(() => {
    console.log("should reset", shouldReset);
    if (shouldReset) {
      setBgColour("white");
      setHoverColour("#ce53ae24");
    }
  }, [shouldReset]);

  return (
    <Grow
      in={true}
      timeout={growDuration}
      style={{
        transformOrigin: "0 0 0",
        transition: "background-color 0.5s ease",
      }}
      mountOnEnter
      unmountOnExit
    >
      <Paper
        elevation={3}
        className={classes.card}
        data-vote={data}s
        onClick={onClick}
      >
        <Typography variant="h2" className={classes.typography}>
          {children}
        </Typography>
      </Paper>
    </Grow>
  );
};

export default Card;
