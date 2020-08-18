import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Path from "../../../../routes/Path";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";

import ScreenContainer from "../../../shared/ScreenContainer";
import SelectZoneComp from "../../components/SelectZoneComp";

import {
  httpGetZonesInfo,
  selectMainZone,
  selectSubZone,
} from "../../../../store/actions/clientsAction";
import { mainZones } from "../../../fakeData";

const useStyles = makeStyles((theme) => ({
  row: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  titleContainer: {
    paddingBottom: theme.spacing(1),
  },
}));

const SelectZoneScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);

  const zones = useSelector((state) => state.clients.zones);
  const selectedMainZone = useSelector(
    (state) => state.clients.selectedMainZone
  );

  useEffect(() => {
    const httpGetZonesHandler = async () => {
      await dispatch(httpGetZonesInfo());
    };
    httpGetZonesHandler();
  }, []);

  const selectMainZoneHandler = async (value) => {
    if (selectedMainZone.data) {
      setAnimate(false);
      await dispatch(selectMainZone(value));
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 200);
    } else {
      await dispatch(selectMainZone(value));
      setAnimate(true);
    }
  };

  const selectSubZoneHandler = async (value) => {
    await dispatch(selectSubZone(value));
    const path = Path.clients.newInvoice;
    navigateHandler(path);
  };

  const navigateHandler = (path) => {
    history.push(path);
  };

  return (
    <ScreenContainer>
      <div>
        <div className={classes.titleContainer}>
          <Typography variant="h6">
            درخواست قیمتت مربوط به کدوم حوزه میشه؟
          </Typography>
        </div>
        <SelectZoneComp data={zones} onSelectItem={selectMainZoneHandler} />
      </div>
      <Divider className={classes.row} />
      {/* <h6 onClick={animateHandler}>click</h6> */}
      <Zoom in={animate}>
        <div>
          <div className={classes.titleContainer}>
            <Typography variant="h6">
              حالا دسته بندی رو انتخاب کن ...
            </Typography>
          </div>
          <SelectZoneComp
            data={selectedMainZone.data || []}
            onSelectItem={selectSubZoneHandler}
          />
        </div>
      </Zoom>
    </ScreenContainer>
  );
};

export default SelectZoneScreen;
