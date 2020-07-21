import React from "react";
import { useAvailHeight } from "../../../hooks/hooks";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
      <Grid container spacing={4} className={classes.row}>
        <Grid item className={classes.item}>
          <CardButton
            title="فاکتورهای فعال"
            notif={15}
            handelClick={() => navigateHandler(path.inbox)}
            // icon={<InboxIcon fontSize="large" />}
          />
        </Grid>
        <Grid item className={classes.item}>
          <CardButton
            title="ایجاد فاکتور جدید"
            handelClick={() => navigateHandler(path.selectProvinceCity)}
          />
        </Grid>
        <Grid item className={classes.item}>
          <CardButton
            title="آرشیو فاکتورها"
            handelClick={() => navigateHandler(path.archive)}
          />
        </Grid>
      </Grid>
    </ScreenContainer>
  );
};

export default ClientHome;
