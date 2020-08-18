import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";

import ScreenContainer from "../../shared/ScreenContainer";
import SelectFieldComp from "../components/SelectFieldComp";

import {
  selectParentField,
  selectField,
} from "../../../store/actions/clientsAction";

const useStyles = makeStyles((theme) => ({
  row: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  titleContainer: {
    paddingBottom: theme.spacing(1),
  },
}));

const SelectZoneScreen = ({ handleStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(true);

  const parentFields = useSelector((state) => state.clients.parentFields);
  const fields = useSelector((state) => state.clients.fields);

  const selectedParentField = useSelector(
    (state) => state.clients.selectedParentField
  );

  const selectedField = useSelector((state) => state.clients.selectedField);

  // useEffect(() => {
  //   const httpGetZonesHandler = async () => {
  //     await dispatch(httpGetAllFields());
  //   };
  //   httpGetZonesHandler();
  // }, []);

  const selectParentFieldHandler = async (value) => {
    if (selectedParentField._id) {
      setAnimate(false);
      await dispatch(selectParentField(value));
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 200);
    } else {
      await dispatch(selectParentField(value));
      setAnimate(true);
    }
  };

  const selectFieldHandler = async (value) => {
    await dispatch(selectField(value));
    handleStep.next();
  };

  return (
    <ScreenContainer>
      <div>
        <div className={classes.titleContainer}>
          <Typography variant="h6">
            درخواست قیمتت مربوط به کدوم حوزه میشه؟
          </Typography>
        </div>
        <SelectFieldComp
          data={parentFields}
          selectedItem={selectedParentField}
          onSelectItem={selectParentFieldHandler}
        />
      </div>
      <Divider className={classes.row} />
      {/* <h6 onClick={animateHandler}>click</h6> */}
      {animate && (
        <Zoom in={animate}>
          <div>
            <div className={classes.titleContainer}>
              {/* <Typography variant="h6">
                حالا دسته بندی رو انتخاب کن ...
              </Typography> */}
            </div>
            <SelectFieldComp
              data={
                fields.filter(
                  (item) => item.parentFieldId === selectedParentField._id
                ) || []
              }
              selectedItem={selectedField}
              onSelectItem={selectFieldHandler}
            />
          </div>
        </Zoom>
      )}
    </ScreenContainer>
  );
};

export default SelectZoneScreen;
