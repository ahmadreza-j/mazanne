import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  extendedlabel: {
    marginRight: theme.spacing(1),
  },
}));

export default function UFab(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Fab variant={isMobileScreen ? "round" : "extended"} {...props} >
      {!isMobileScreen && (
        <span className={props.extendedlabel && classes.extendedlabel}>
          {props.extendedlabel && props.extendedlabel}
        </span>
      )}
      {props.children}
    </Fab>
  );
}
