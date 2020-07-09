import React from "react";

import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const EditInvoiceAction = ({ editInvoiceItemHandler, cancelEditHandler }) => {
  return (
    <>
      <Grid item>
        <Fab
          variant="extended"
          aria-label="confirmEdit"
          size="small"
          color="primary"
          onClick={editInvoiceItemHandler}
        >
          ثبت
          <CheckIcon />
        </Fab>
      </Grid>
      <Grid item>
        <Fab
          variant="extended"
          aria-label="cancelEdit"
          size="small"
          color="secondary"
          onClick={cancelEditHandler}
        >
          انصراف
          <CloseIcon />
        </Fab>
      </Grid>
    </>
  );
};

export default EditInvoiceAction;
