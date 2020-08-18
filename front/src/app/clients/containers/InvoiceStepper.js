import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SelectCity from "../containers/SelectCity";
import SelectZone from "../containers/SelectZone";
import CreateInvoice from "../containers/CreateInvoice";
import ReviewSubmitInvoice from "../containers/ReviewSubmitInvoice";

import {
  httpGetInvoiceById,
  selectParentField,
  selectField,
  selectProvinces,
  selectCities,
  setInvoiceItemsList,
} from "../../../store/actions/clientsAction";
import {
  httpGetProvinces,
  httpGetCities,
  httpGetAllParentFields,
  httpGetAllFields,
  httpGetAllChildFields,
  httpGetExpireActivities,
  httpGetUnits
} from "../../../store/actions/publicAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["انتخاب شهر", "انتخاب حوزه", "ثبت درخواست"];
}

export default function InvoiceStepper() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const storeGetedInvoiceById = useSelector(
    (state) => state.clients.getedInvoiceById
  );

  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const steps = getSteps();
  const routeParams = useParams();
  const invoiceId = routeParams.id;

  useEffect(() => {
    const getInitialData = async () => {
      loadingHandler(true);
      const _allProvinces = await dispatch(httpGetProvinces());
      const _allCities = await dispatch(httpGetCities("isolated"));
      const _allParentFields = await dispatch(httpGetAllParentFields());
      const _allFields = await dispatch(httpGetAllFields("isolated"));
      const _allChildFields = await dispatch(httpGetAllChildFields("isolated"));
      const _allUnits = await dispatch(httpGetUnits());
      const _allExpireActivities = await dispatch(httpGetExpireActivities());
      if (invoiceId === "create") {
        loadingHandler(false);
      } else {
        const getedInvoiceById = await dispatch(httpGetInvoiceById(invoiceId));
        const setInitialStates = async () => {
          // const invoiceSelectedProvinces = _allProvinces.filter((province) =>
          //   getedInvoiceById.provinces
          //     .map((item) => item._id)
          //     .includes(province._id)
          // );
          // const invoiceSelectedField = _allFields
          //   .find((field) => field._id === getedInvoiceById.field._id)
          //   .filter((field) => field._id === getedInvoiceById.subZone._id);

          // const invoiceSelectedProvinces = getedInvoiceById.provinces;
          // const invoiceSelectedCities = getedInvoiceById.cities;
          // const invoiceSelectedParentField = getedInvoiceById.ParentField;
          // const invoiceSelectedField = getedInvoiceById.field;
          // const invoiceItems = getedInvoiceById.items;

          const {
            provinces,
            cities,
            ParentField,
            field,
            items,
          } = getedInvoiceById;

          await dispatch(selectProvinces(provinces));
          await dispatch(selectCities(cities));
          await dispatch(selectParentField(ParentField));
          await dispatch(selectField(field));
          await dispatch(setInvoiceItemsList(items));
          // items.forEach((item) => dispatch(addNewInvoiceItem(item)));

          loadingHandler(false);
        };
        setInitialStates();
      }
    };
    getInitialData();
    return () => {
      dispatch(selectProvinces([]));
      dispatch(selectCities([]));
      dispatch(selectParentField({}));
      dispatch(selectField({}));
      dispatch(setInvoiceItemsList([]));
    };
  }, [dispatch, invoiceId]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepHandler = {
    next: handleNext,
    back: handleBack,
    reset: handleReset,
  };

  const loadingHandler = (bool) => {
    setIsLoading(bool);
  };

  const getStepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <SelectCity handleStep={stepHandler} />;
      case 1:
        return invoiceId === "create" ? (
          <SelectZone handleStep={stepHandler} />
        ) : (
          <div>
            <div>
              <h1>
                <span>{storeGetedInvoiceById.parentField.label}</span>/
                <span>{storeGetedInvoiceById.field.label}</span>
              </h1>
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                مرحله قبل
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "تمااام" : "مرحله بعد"}
              </Button>
            </div>
          </div>
        );
      case 2:
        return <CreateInvoice handleStep={stepHandler} />;
      default:
        return "Unknown stepIndex";
    }
  }, [activeStep]);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            {/* <Typography className={classes.instructions}>
              All steps completed
            </Typography> */}
            <ReviewSubmitInvoice />
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {/* <Typography className={classes.instructions}> */}
            {isLoading ? "Loading ..." : getStepContent}
            {/* </Typography> */}
          </div>
        )}
      </div>
    </div>
  );
}
