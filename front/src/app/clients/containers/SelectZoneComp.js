import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  item: {
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    textAlign: "center",
  },
}));

export default function SelectZoneComp({ data, onSelectItem }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList} cols={3}>
        {data.map((item) => (
          <GridListTile key={item.id} cols={1}>
            <Paper className={classes.item} onClick={() => onSelectItem(item)}>
              <label>{item.label}</label>
            </Paper>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
