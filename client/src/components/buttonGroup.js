import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    width: "20em",
  },
  button: {
    margin: "8% 0",
  },
  firstButton: {
    margin: "25% 0",
  },
}));

const ButtonGroup = ({
  onCreateRoomClick,
  onJoinRoomClick,
  onChange,
  input,
  error,
  errorMessage,
}) => {
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
      <TextField
        label="Enter room code"
        variant="outlined"
        fullWidth={true}
        onChange={onChange}
        required
        error={error}
        helperText={error ? errorMessage : ''}
      >
        {input}
      </TextField>
      {/* <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        /> */}
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
