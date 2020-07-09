import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(1),
    // marginLeft: theme.spacing(1),
  },
}));

const ExtendBtnTitle = ({ title }) => {
  const classes = useStyles();

  return <span className={classes.title}>{title}</span>;
};

export default ExtendBtnTitle;
