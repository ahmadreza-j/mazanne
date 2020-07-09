import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
}));

const NewInvoiceItem = ({ index, item }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h6">{index}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{item.productCategory.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{item.productName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{item.productCount}</Typography>
        </Grid>
        {item.productDesc && (
          <Grid item>
            <Typography variant="h6">{item.productDesc}</Typography>
          </Grid>
        )}
        {item.productImg && (
          <Grid item>
            <img
              style={{ height: "100px", width: "100px" }}
              src={item.productImg}
            />
          </Grid>
        )}
        <Grid item>
          <Fab aria-label="add" size="medium" color="primary">
            <EditIcon />
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewInvoiceItem;
