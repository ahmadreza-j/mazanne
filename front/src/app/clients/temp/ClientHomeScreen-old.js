import React from "react";
import { useAvailHeight } from "../../../hooks/hooks";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import InboxIcon from "@material-ui/icons/Inbox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ArchiveIcon from "@material-ui/icons/Archive";

import ScreenContainer from "../../shared/ScreenContainer";
import CardButton from "../components/CardButton";

const ClientHome = () => {
  const history = useHistory();
  const availHeight = useAvailHeight();

  const useStyles = makeStyles((theme) => ({
    screenContainer: {
      // backgroundColor:"blue"
      // ...availHeight,
      // backgroundColor: "gray",
    },
    row: {
      // height: 200,
      // width: "100%",
      // backgroundColor: "red",
    },
    item: {
      // height: "100%",
    },
  }));
  const classes = useStyles();

  const path = {
    selectProvinceCity: "/select-province-city",
    inbox: "/inbox",
    archive: "/archive",
  };

  const navigateHandler = (path) => {
    history.push(path);
  };

  return (
    <ScreenContainer className={classes.screenContainer}>
      <Grid container spacing={2} className={classes.row}>
        <Grid item className={classes.item} xs={12} sm={4}>
          <CardButton
            title="فاکتورهای فعال"
            notif={15}
            handelClick={() => navigateHandler(path.inbox)}
            icon={<InboxIcon fontSize="large" />}
          />
        </Grid>
        <Grid item className={classes.item} xs={12} sm={4}>
          <CardButton
            title="ایجاد فاکتور جدید"
            handelClick={() => navigateHandler(path.selectProvinceCity)}
            icon={<AddBoxIcon fontSize="large" />}
          />
        </Grid>
        <Grid item className={classes.item} xs={12} sm={4}>
          <CardButton
            title="آرشیو فاکتورها"
            handelClick={() => navigateHandler(path.archive)}
            icon={<ArchiveIcon fontSize="large" />}
          />
        </Grid>
      </Grid>
    </ScreenContainer>
  );
};

export default ClientHome;
