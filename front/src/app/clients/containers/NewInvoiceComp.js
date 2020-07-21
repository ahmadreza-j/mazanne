import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  NewInvoiceCompItem,
  scrollToBot,
} from "../../../store/actions/clientsAction";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";

import { makeStyles } from "@material-ui/core/styles";

import UInput from "../components/ui/UInput";
import USelect2 from "../components/ui/USelect2";

import NewInvoiceAction from "../components/NewInvoiceAction";
import MoreInfoNewInvoice from "../components/MoreInfoNewInvoice";
import { invoiceItem, invoiceInitialValue } from "../Model/clientsModel";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
  imagePicker: {
    height: 50,
    width: 50,
  },
}));

const NewInvoiceComp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedZone = useSelector((state) => state.clients.selectedZone);
  const unitList = useSelector((state) => state.clients.units);
  const initialState = invoiceInitialValue();

  useEffect(() => {
    setProductCategory(selectedZone.data ? selectedZone.data[0] : "");
    setProductUnit(unitList[0]);
  }, [selectedZone, unitList]);

  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState(initialState.productName);
  const [productCount, setProductCount] = useState(initialState.productCount);
  const [productUnit, setProductUnit] = useState("");
  const [productDesc, setProductDesc] = useState(initialState.productDesc);
  const [productImg, setProductImg] = useState(initialState.productImg);

  const [showMore, setShowMore] = useState(initialState.showMore);

  const onSelectCategory = (value) => {
    setProductCategory(value);
  };
  const onChangeProductName = (value) => {
    setProductName(value);
  };
  const onChangeProductCount = (value) => {
    setProductCount(value);
  };
  const onSelectUnit = (value) => {
    setProductUnit(value);
  };
  const onChangeProductDesc = (value) => {
    setProductDesc(value);
  };
  const onChangeProductImg = (file) => {
    setProductImg(file);
  };

  const showMoreHandler = async () => {
    await setShowMore(() => !showMore);
    // dispatch(scrollToBot());
  };

  const NewInvoiceCompItemHandler = async () => {
    const newItem = invoiceItem(
      productCategory,
      productName,
      productCount,
      productUnit,
      productDesc,
      productImg
    );

    await dispatch(NewInvoiceCompItem(newItem));
    dispatch(scrollToBot());
    resetForm();
  };

  const resetForm = () => {
    setProductName(initialState.productName);
    setProductCount(initialState.productCount);
    setProductCount(initialState.productCount);
    setProductUnit(unitList[0]);
    setProductImg(initialState.productImg);
    setShowMore(initialState.showMore);
  };

  return (
    // <Grid container justify="center">
    //   <Grid item lg={6} md={8} sm={12}>
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={1}
        justify="space-between"
      >
        <Grid item md={true} sm={6} xs={12}>
          <USelect2
            inputLabel="انتخاب دسته بندی"
            selectiveData={selectedZone.data || []}
            onSelect={onSelectCategory}
            selectedItem={productCategory}
          />
        </Grid>
        <Grid item md={true} sm={6} xs={12}>
          <UInput
            type="text"
            label="نام کالای درخواستی"
            value={productName}
            onChangeText={onChangeProductName}
          />
        </Grid>
        <Grid item md={1} sm={true} xs={3}>
          <UInput
            type="number"
            label="تعداد"
            value={productCount}
            onChangeText={onChangeProductCount}
          />
        </Grid>
        <Grid item md={2} sm={true} xs={true}>
          <USelect2
            inputLabel="واحد"
            selectiveData={unitList}
            onSelect={onSelectUnit}
            selectedItem={productUnit}
          />
        </Grid>
        <Grid item md={2} sm={true} xs={false}>
          <NewInvoiceAction
            showMore={showMore}
            showMoreHandler={showMoreHandler}
            NewInvoiceCompItemHandler={NewInvoiceCompItemHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <Collapse in={showMore}>
            <MoreInfoNewInvoice
              productDesc={productDesc}
              onChangeProductDesc={onChangeProductDesc}
              productImg={productImg}
              onChangeProductImg={onChangeProductImg}
            />
          </Collapse>
        </Grid>
      </Grid>
    </Paper>
    //   </Grid>
    // </Grid>
  );
};

export default NewInvoiceComp;
