import React from "react";
import { useSelector } from "react-redux";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import ScreenContainer from "../../shared/ScreenContainer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

import NewInvoiceComp from "../containers/NewInvoiceComp";
import EditInvoiceItemDialog from "../containers/EditInvoiceItemDialog";
import NewInvoiceTable from "../containers/NewInvoiceTable";
import InvoiceItemCardList from "../containers/InvoiceItemCardList";

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
}));

const CreateInvoice = ({ handleStep }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("xs"));

  // const selectedProvinces = useSelector(
  //   (state) => state.clients.selectedProvinces
  // );
  // const selectedCities = useSelector((state) => state.clients.selectedCities);
  // const selectedParentField = useSelector(
  //   (state) => state.clients.selectedParentField
  // );
  // const selectedField = useSelector((state) => state.clients.selectedField);
  const newInvoiceItems = useSelector((state) => state.clients.newInvoiceItems);
  const isModalOpen = useSelector((state) => state.clients.isEditModalOpen);

  // const createInvoiceHandler = async () => {
  //   // const location = await clientLocation();
  //   const newInvoice = createdInvoice(
  //     { _id: "0520490835" },
  //     selectedProvinces,
  //     selectedCities,
  //     selectedParentField,
  //     selectedField,
  //     newInvoiceItems
  //     // location
  //   );
  //   const newInvoiceFormData = newInvoice.toFormData();
  //   // console.log(newInvoice)
  //   dispatch(httpCreateNewInvoice(newInvoiceFormData));
  // };

  return (
    <>
      <ScreenContainer>
        <div className={classes.titleContainer}>
          <Typography variant="h5">استعلام قیمت</Typography>
        </div>
        <div className={classes.sticky}>
          <NewInvoiceComp />
        </div>
        <div className={classes.contentContainer}>
          {newInvoiceItems.length === 0 && (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={() => handleStep.back()}
            >
              مرحله قبل
            </Button>
          )}

          {newInvoiceItems.length > 0 && (
            <Fade in={newInvoiceItems.length > 0}>
              <div>
                {isMobileScreen ? (
                  <InvoiceItemCardList tableData={newInvoiceItems} />
                ) : (
                  <NewInvoiceTable tableData={newInvoiceItems} />
                )}
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={() => handleStep.back()}
                  >
                    مرحله قبل
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => handleStep.next()}
                  >
                    بازبینی و ثبت نهایی
                  </Button>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={createInvoiceHandler}
                  >
                    درخواست استعلام
                  </Button> */}
                </div>
              </div>
            </Fade>
          )}
        </div>
      </ScreenContainer>

      {isModalOpen && <EditInvoiceItemDialog />}
    </>
  );
};

export default CreateInvoice;
