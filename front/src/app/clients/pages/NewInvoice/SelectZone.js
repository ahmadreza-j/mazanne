import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import ScreenContainer from "../../shared/ScreenContainer";

import SelectZoneComp from "../../containers/SelectZoneComp";

const useStyles = makeStyles((theme) => ({}));

export default Template = () => {
  const classes = useStyles();

  return (
    <ScreenContainer>
      <SelectZoneComp />
    </ScreenContainer>
  );
};
