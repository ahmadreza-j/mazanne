import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
}));

export default function UInput({ type, label, value, onChangeText }) {
  const classes = useStyles();

  const changeTextHanler = (event) => {
    onChangeText(event.target.value);
  };

  const rendreComponentHandler = () => {
    switch (type) {
      case "number": {
        return (
          <TextField
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            label={label}
            variant="outlined"
            value={value < 0 ? 1 : value}
            onChange={changeTextHanler}
            size="small"
          />
        );
      }

      case "text": {
        return (
          <TextField
            type="text"
            label={label}
            variant="outlined"
            value={value}
            onChange={changeTextHanler}
            size="small"
          />
        );
      }

      case "multiline": {
        return (
          <TextField
            // placeholder="Placeholder"
            multiline
            rowsMax={2}
            label={label}
            variant="outlined"
            value={value}
            onChange={changeTextHanler}
            size="small"
          />
        );
      }

      default:
        return;
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {rendreComponentHandler()}
    </form>
  );
}
