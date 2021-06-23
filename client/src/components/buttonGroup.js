import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    width: "40%",
  },
  button: {
    margin: "8% 0",
  },
  firstButton: {
    margin: "25% 0",
  },

}));

const ButtonGroup = ({ onCreateRoomClick, onJoinRoomClick, onChange, input }) => {
  const classes = useStyles();
  return (
    <div id="button group" className={classes.buttonGroup}>
      <Button
        variant="contained"
        color="primary"
        fullWidth={true}
        className={classes.firstButton}
        onClick={onCreateRoomClick}
      >
        Create new voting room
      </Button>
      <TextField label="Enter room code" fullWidth={true} onChange={onChange}>{input}</TextField>
      <Button
        variant="contained"
        color="default"
        fullWidth={true}
        className={classes.button}
        onClick={onJoinRoomClick}
      >
        Join existing room
      </Button>
    </div>
  );
};

export default ButtonGroup;
