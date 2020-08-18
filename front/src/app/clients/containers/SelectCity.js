import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";

import ScreenContainer from "../../shared/ScreenContainer";
import MACSelect from "../components/ui/MACSelect";
import UFab from "../components/ui/UFab";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

import {
  selectProvinces,
  selectCities,
} from "../../../store/actions/clientsAction";

const useStyles = makeStyles((theme) => ({
  row: {
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    padding: `${theme.spacing(1)}px 0px`,
  },
}));

const SelectCityScreen = ({ handleStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const allProvinces = useSelector((state) => state.clients.provinces);
  const allCities = useSelector((state) => state.clients.cities);

  const storeSelectedProvinces = useSelector(
    (state) => state.clients.selectedProvinces
  );
  const storeSelectedCities = useSelector(
    (state) => state.clients.selectedCities
  );
  const [allAvailCities, setAllAvailCities] = useState([]);
  const [validProvinces, setValidProvinces] = useState([]);
  const [invalidProvinces, setInvalidProvinces] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    const availCitiesHandler = (selectedProvincesList) => {
      const availCities = allCities.filter((city) =>
        selectedProvincesList
          .map((province) => province._id)
          .includes(city.provinceId)
      );
      setAllAvailCities(availCities);
      const verifiedCities = storeSelectedCities.filter((city) =>
        availCities.map((availCity) => availCity._id).includes(city._id)
      );
      dispatch(selectCities(verifiedCities));
    };
    availCitiesHandler(storeSelectedProvinces);
  }, [dispatch, storeSelectedProvinces]);

  useEffect(() => {
    const validateProvinces = (selectedProvincesList, selectedCitiesList) => {
      const _invalidProvinces = selectedProvincesList.filter((province) => {
        return !selectedCitiesList
          .map((item) => item.provinceId)
          .includes(province._id);
        // return province.cities.every(
        //   (city) => !selectedCitiesList.includes(city)
        // );
      });
      const _validProvinces = selectedProvincesList.filter((province) => {
        return selectedCitiesList
          .map((item) => item.provinceId)
          .includes(province._id);
        // return province.cities.some((city) =>
        //   selectedCitiesList.includes(city)
        // );
      });
      setInvalidProvinces(_invalidProvinces);
      setValidProvinces(_validProvinces);
    };
    validateProvinces(storeSelectedProvinces, storeSelectedCities);
  }, [storeSelectedProvinces, storeSelectedCities]);

  const labelSort = (a, b) => a.label.localeCompare(b.label, "fa");

  const onSelectProvinces = (value) => {
    dispatch(selectProvinces(value));
  };

  const onSelectCities = (value) => {
    dispatch(selectCities(value));
  };

  const selectAllProvinces = async () => {
    await dispatch(selectProvinces(allProvinces));
  };

  const selectAllCities = () => {
    dispatch(selectCities(allAvailCities));
  };

  const nextStepHandler = () => {
    if (invalidProvinces.length === 0) {
      nextStep();
    } else {
      showConfirmDialog();
    }
  };

  const showConfirmDialog = () => {
    setDialogOpen(true);
    const invalidProvincesLabels = invalidProvinces.map(
      (province) => province.label
    );
    if (invalidProvinces.length === 1) {
      setDialogMessage(
        `از استان "${invalidProvincesLabels}" شهری انتخاب نشده است، ادامه میدهید؟`
      );
    } else
      setDialogMessage(
        `از استان های "${invalidProvincesLabels}" شهری انتخاب نشده است، ادامه میدهید؟`
      );
  };

  const nextStep = async () => {
    await dispatch(selectProvinces(validProvinces));
    handleStep.next();
  };

  return (
    <ScreenContainer>
      <Grid container>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={true}>
            <MACSelect
              inputLabel="انتخاب استان"
              selectiveData={allProvinces.sort(labelSort)}
              selectedItem={storeSelectedProvinces}
              onSelect={onSelectProvinces}
              placeholder="میتونید جستجو کنید ..."
            />
          </Grid>
          <Grid item>
            <UFab
              extendedlabel="همه ایران"
              aria-label="add"
              size="large"
              color="primary"
              onClick={selectAllProvinces}
            >
              <PlaylistAddCheckIcon />
            </UFab>
          </Grid>
        </Grid>
        {allAvailCities.length > 0 && (
          <Zoom
            in={allAvailCities.length > 0}
            timeout={{ enter: 300, exit: 600 }}
          >
            <Grid
              container
              className={classes.row}
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={true}>
                <MACSelect
                  inputLabel="انتخاب شهر"
                  selectiveData={allAvailCities.sort(labelSort)}
                  selectedItem={storeSelectedCities}
                  onSelect={onSelectCities}
                  placeholder="میتونید جستجو کنید ..."
                />
              </Grid>
              <Grid item>
                <UFab
                  extendedlabel="کل استان"
                  aria-label="add"
                  size="large"
                  color="primary"
                  onClick={selectAllCities}
                >
                  <PlaylistAddCheckIcon />
                </UFab>
              </Grid>
            </Grid>
          </Zoom>
        )}
        {storeSelectedCities.length > 0 && (
          <Zoom in={storeSelectedCities.length > 0}>
            <Grid
              container
              className={classes.buttonContainer}
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={nextStepHandler}
              >
                مرحله بعد
              </Button>
            </Grid>
          </Zoom>
        )}
      </Grid>
      <ConfirmDialog
        text={dialogMessage}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        confirmAction={nextStep}
      />
    </ScreenContainer>
  );
};

export default SelectCityScreen;
