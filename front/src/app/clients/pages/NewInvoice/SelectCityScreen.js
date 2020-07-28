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

  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [availCities, setAvailCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

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

  const nextStep = async () => {
    await dispatch(selectProvinces(selectedProvinces));
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
              selectiveData={allProvinces}
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
                selectiveData={availCities}
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
              onClick={nextStep}
            >
              مرحله آخر
            </Button>
          </Grid>
        </Zoom>
      </Grid>
    </ScreenContainer>
  );
};

export default SelectCityScreen;
