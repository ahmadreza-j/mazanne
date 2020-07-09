import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Fade from "@material-ui/core/Fade";

import SelectZoneDialog from "../../components/SelectZoneDialog";
import NewInvoiceTable from "../../components/NewInvoiceTable";
import NewInvoiceComp from "../../components/NewInvoiceComp";
import EditInvoiceItemDialog from "../../components/EditInvoiceItemDialog";

import {
  showSelectZoneHandler,
  httpGetZonesInfo,
  httpGetUnits,
} from "../../../../redux/actions/clientsAction";

import "../../components/style/newInvoiceScreen.css";

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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  contentContainer: {
    paddingTop: theme.spacing(1),
    paddingRight: "1px",
    paddingLeft: "1px",
  },
  buttonContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
      <Container maxWidth="lg" className="wrapper">
        <div className={classes.titleContainer}>
          <Typography variant="h5">استعلام قیمت</Typography>
        </div>
        <div className={classes.sticky}>
          {/* <div className={classes.sticky} ref={NewInvoiceCompSection}> */}
          <NewInvoiceComp />
        </div>
        <div className={("content", classes.contentContainer)}>
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
      </Container>

      {isModalOpen && <EditInvoiceItemDialog />}
    </>
  );
};

export default NewInvoiceScreen;
