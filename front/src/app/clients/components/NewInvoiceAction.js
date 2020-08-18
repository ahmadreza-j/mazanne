import React from "react";

import Grid from "@material-ui/core/Grid";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";

import UFab from "./ui/UFab";

const NewInvoiceAction = ({
  showMore,
  showMoreHandler,
  NewInvoiceCompItemHandler,
}) => {

  return (
    <Grid container spacing={1} >
      <Grid item>
        <UFab
          aria-label="more"
          size="small"
          color="secondary"
          onClick={showMoreHandler}
        >
          {showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </UFab>
      </Grid>
      <Grid item >
        <UFab
          extendedlabel="افزودن"
          aria-label="add"
          size="small"
          color="primary"
          onClick={NewInvoiceCompItemHandler}
        >
          <AddIcon />
        </UFab>
      </Grid>
    </Grid>
  );
};

export default NewInvoiceAction;
