import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: "100%",
    height: "100%",
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
            <ButtonBase
              component={Paper}
              className={classes.item}
              onClick={() => onSelectItem(item)}
            >
              {item.label}
            </ButtonBase>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
