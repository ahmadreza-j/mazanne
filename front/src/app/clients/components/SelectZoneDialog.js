import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import ResponsiveModal from "./ui/ResponsiveModal";

import {
  showSelectZoneHandler,
  selectZone,
} from "../../../redux/actions/clientsAction";

import { zones } from "../../fakeData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.warning.light,
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
    color:theme.palette.secondary.light,
    textAlign: "center",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SelectZoneDialog() {
  const classes = useStyles();
  const isShowSelectZone = useSelector(
    (state) => state.clients.isShowSelectZone
  );
  const dispatch = useDispatch();

  const colseHandler = () => {
    dispatch(showSelectZoneHandler(false));
  };

  const selectZoneHandler = async (zone) => {
    await dispatch(selectZone(zone));
    dispatch(showSelectZoneHandler(false));
  };

  return (
    <ResponsiveModal
      title="انتخاب حوزه فعالیت"
      isOpen={isShowSelectZone}
      closeHandler={colseHandler}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <div className={classes.root}>
        <GridList cellHeight={100} className={classes.gridList} cols={3}>
          {zones.map((zone) => (
            <GridListTile key={zone.id} cols={1}>
              <Paper
                className={classes.item}
                onClick={() => selectZoneHandler(zone)}
              >
                <label>{zone.label}</label>
              </Paper>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </ResponsiveModal>
  );
}
