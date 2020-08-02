import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";

import ScreenContainer from "../../../shared/ScreenContainer";
import MACSelect from "../../components/ui/MACSelect";
import UFab from "../../components/ui/UFab";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

import {
  httpGetProvinces,
  selectProvinces,
  selectCities,
} from "../../../../store/actions/clientsAction";

const useStyles = makeStyles((theme) => ({
  row: {
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    padding: `${theme.spacing(1)}px 0px`,
  },
}));

const SelectCityScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const allProvinces = useSelector((state) => state.clients.provinces);
  const storeSelectedProvinces = useSelector(
    (state) => state.clients.selectedProvinces
  );
  const storeSelectedCities = useSelector(
    (state) => state.clients.selectedCities
  );

  const [selectedProvinces, setSelectedProvinces] = useState(
    storeSelectedProvinces
  );
  const [availCities, setAvailCities] = useState(storeSelectedCities);
  const [selectedCities, setSelectedCities] = useState(storeSelectedCities);
  const [validProvinces, setValidProvinces] = useState([]);
  const [invalidProvinces, setInvalidProvinces] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    dispatch(httpGetProvinces());
  }, [dispatch]);

  useEffect(() => {
    setAvailCities(availCitiesHandler(selectedProvinces));
  }, [selectedProvinces]);

  useEffect(() => {
    setSelectedCities((prewSelected) => {
      return prewSelected.filter((city) => {
        return availCities.includes(city);
      });
    });
  }, [availCities]);

  useEffect(() => {
    const validateProvinces = () => {
      const _invalidProvinces = selectedProvinces.filter((province) =>
        province.cities.every((city) => !selectedCities.includes(city))
      );
      // const validProvinces = selectedProvinces.filter(
      //   (province) => !invalidProvinces.includes(province)
      // );
      const _validProvinces = selectedProvinces.filter((province) =>
        province.cities.some((city) => selectedCities.includes(city))
      );

      setInvalidProvinces(_invalidProvinces);
      setValidProvinces(_validProvinces);
    };
    validateProvinces();
  }, [selectedProvinces, selectedCities]);

  const labelSort = (a, b) => a.label.localeCompare(b.label, "fa");

  const availCitiesHandler = (selectedProvincesList) => {
    const allCities = [];
    selectedProvincesList.forEach((province) =>
      province.cities.forEach((city) => allCities.push(city))
    );
    return allCities;
  };

  const onSelectProvinces = (value) => {
    setSelectedProvinces(value);
  };

  const onSelectCities = (value) => {
    setSelectedCities(value);
  };

  const selectAllProvinces = async () => {
    await setSelectedProvinces(() => {
      return allProvinces;
    });
    await setSelectedCities(() => {
      return availCitiesHandler(allProvinces);
    });
  };

  const SelectAllCities = () => {
    setSelectedCities(availCities);
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
    await dispatch(selectCities(selectedCities));
    const path = "/select-zone";
    navigateHandler(path);
  };

  const navigateHandler = (path) => {
    history.push(path);
  };

  // const setTotalSelected = () => {
  //   const totalSelected = [...selectedProvinces];
  //   totalSelected.forEach((province) => {
  //     province.cities = province.cities.filter((city) =>
  //       selectedCities.includes(city)
  //     );
  //   });
  // };

  return (
    <ScreenContainer>
      <Grid container>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={true}>
            <MACSelect
              inputLabel="انتخاب استان"
              selectiveData={allProvinces.sort(labelSort)}
              selectedItem={selectedProvinces}
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
        <Zoom in={availCities.length > 0} timeout={{ enter: 300, exit: 600 }}>
          <Grid
            container
            className={classes.row}
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={true}>
              <MACSelect
                inputLabel="انتخاب شهر"
                selectiveData={availCities.sort(labelSort)}
                selectedItem={selectedCities}
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
                onClick={SelectAllCities}
              >
                <PlaylistAddCheckIcon />
              </UFab>
            </Grid>
          </Grid>
        </Zoom>
        <Zoom in={selectedCities.length > 0}>
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
              مرحله آخر
            </Button>
          </Grid>
        </Zoom>
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
