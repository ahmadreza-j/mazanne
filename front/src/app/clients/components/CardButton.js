import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

import InboxIcon from "@material-ui/icons/Inbox";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: 100,
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  row: {
    width: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  row2: {
    width: "100%",
    display: "flex",
    flexGrow: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

const CardButton = ({ title, icon, notif, handelClick }) => {
  const classes = useStyles();

  return (
    <ButtonBase
      component={Paper}
      className={classes.mainContainer}
      onClick={handelClick}
    >
      {notif !== undefined && (
        <div className={classes.row}>
          <Badge
            badgeContent={notif}
            max={999}
            color="secondary"
            children={<InboxIcon />}
          />
        </div>
      )}
      {/* <div>{icon}</div> */}
      <div className={classes.row2}>
        <Typography variant="h5"> {title}</Typography>
        {/* {icon} <span>{title}</span> */}
      </div>
    </ButtonBase>
  );
};

export default CardButton;
