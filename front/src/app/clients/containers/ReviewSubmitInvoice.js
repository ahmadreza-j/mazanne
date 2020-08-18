import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import ScreenContainer from "../../shared/ScreenContainer";
import Uselect2 from "../components/ui/USelect2";

import {
  selectExpireActivity,
  httpCreateNewInvoice,
} from "../../../store/actions/clientsAction";
import { createdInvoice } from "../controllers/invoiceController";

const useStyles = makeStyles((theme) => ({}));

const Template = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const expireActivities = useSelector(
    (state) => state.clients.expireActivities
  );
  const selectedProvinces = useSelector(
    (state) => state.clients.selectedProvinces
  );
  const selectedCities = useSelector((state) => state.clients.selectedCities);
  const selectedParentField = useSelector(
    (state) => state.clients.selectedParentField
  );
  const selectedField = useSelector((state) => state.clients.selectedField);
  const newInvoiceItems = useSelector((state) => state.clients.newInvoiceItems);
  const selectedExpireActivity = useSelector(
    (state) => state.clients.selectedExpireActivity
  );

  const selectHandler = (value) => {
    dispatch(selectExpireActivity(value));
  };

  const SubmitInvoiceHandler = async () => {
    const newInvoice = createdInvoice(
      { _id: "0520490835" },
      selectedProvinces,
      selectedCities,
      selectedParentField,
      selectedField,
      newInvoiceItems,
      selectedExpireActivity
      // location
    );
    const newInvoiceFormData = newInvoice.toFormData();
    console.log(newInvoice);
    dispatch(httpCreateNewInvoice(newInvoiceFormData));
  };

  return (
    <ScreenContainer>
      <Uselect2
        inputLabel="مدت فعال بودن"
        selectiveData={expireActivities}
        selectedItem={selectedExpireActivity}
        onSelect={selectHandler}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={SubmitInvoiceHandler}
      >
        درخواست استعلام
      </Button>
    </ScreenContainer>
  );
};

export default Template;
