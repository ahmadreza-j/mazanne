import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    paddingTop: theme.spacing(2),
  },
}));

const ScreenContainer = ({
  children,
  noGutter,
  parentClassName,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <div className={`${classes.screenContainer} ${parentClassName}`}>
      {noGutter ? children : <Container {...restProps}>{children}</Container>}
    </div>
  );
};

export default ScreenContainer;
