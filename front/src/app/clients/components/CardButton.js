import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor:theme.palette.secondary.ultraLight,
    color:theme.palette.primary.dark,
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  row2: {
    width: "100%",
    display: "flex",
    flexGrow: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign:"center"
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
      {notif === undefined ? (
        <div className={classes.row}>{icon}</div>
      ) : (
        <div className={classes.row}>
          <Badge
            badgeContent={notif}
            max={999}
            color="primary"
            children={icon}
            
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
