import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const IconLabel = ({ children, label, color }) => {
  const useStyles = makeStyles((theme) => ({
    row: {
      display: "flex",
      direction: "row",
      alignItems: "center",
      color: color,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.row}>
      {children}
      <label>{label}</label>
    </div>
  );
};

export default IconLabel;
