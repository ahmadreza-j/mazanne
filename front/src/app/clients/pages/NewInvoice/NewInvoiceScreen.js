import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ScreenContainer from "../../../shared/ScreenContainer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Fade from "@material-ui/core/Fade";

import SelectZoneDialog from "../../containers/SelectZoneDialog";
import NewInvoiceTable from "../../containers/NewInvoiceTable";
import NewInvoiceComp from "../../containers/NewInvoiceComp";
import EditInvoiceItemDialog from "../../containers/EditInvoiceItemDialog";

import {
  showSelectZoneHandler,
  httpGetZonesInfo,
  httpGetUnits,
} from "../../../../store/actions/clientsAction";

// import "../../components/style/newInvoiceScreen.css";

const useStyles = makeStyles((theme) => ({
  sticky: {
    // position: "-webkit-sticky",
    position: "sticky",
    top: theme.mixins.toolbar.minHeight,
    zIndex: theme.zIndex.mobileStepper,
    [theme.breakpoints.up("sm")]: {
      top: theme.mixins.toolbar["@media (min-width:600px)"].minHeight,
    },
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    overflow: "auto",
    paddingTop: theme.spacing(1),
    paddingRight: "1px",
    paddingLeft: "1px",
  },
  buttonContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  wrapper: {
    // height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // flexWrap: "nowrap",
  },
}));

const NewInvoiceScreen = () => {
  const classes = useStyles();
  // const NewInvoiceCompSection = useRef(null);
  const dispatch = useDispatch();

  const isShowSelectZone = useSelector(
    (state) => state.clients.isShowSelectZone
  );
  const newInvoiceItems = useSelector((state) => state.clients.newInvoiceItems);
  const isModalOpen = useSelector((state) => state.clients.isEditModalOpen);

  useEffect(() => {
    // ye if bezarim ke age zones ghablan gerefte shode dige nashe dobare
    const fetchInitialData = async () => {
      await dispatch(httpGetZonesInfo());
      await dispatch(httpGetUnits());
      dispatch(showSelectZoneHandler(true));
    };
    fetchInitialData();
  }, [dispatch]);
  return (
    <>
      {isShowSelectZone && <SelectZoneDialog />}
      <ScreenContainer className={classes.wrapper}>
        <div className={classes.titleContainer}>
          <Typography variant="h5">استعلام قیمت</Typography>
        </div>
        <div className={classes.sticky}>
          {/* <div className={classes.sticky} ref={NewInvoiceCompSection}> */}
          <NewInvoiceComp />
        </div>
        <div className={classes.contentContainer}>
          {newInvoiceItems.length > 0 && (
            <Fade in={newInvoiceItems.length > 0}>
              <>
                <NewInvoiceTable tableData={newInvoiceItems} />
                <div className={classes.buttonContainer}>
                  <Button variant="contained" color="primary" fullWidth>
                    درخواست استعلام
                  </Button>
                </div>
              </>
            </Fade>
          )}
        </div>
      </ScreenContainer>

      {isModalOpen && <EditInvoiceItemDialog />}
    </>
  );
};

export default NewInvoiceScreen;
