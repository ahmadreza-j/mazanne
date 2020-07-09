import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  editModalHandler,
  editInvoiceItem,
} from "../../../redux/actions/clientsAction";

import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

// import { makeStyles } from "@material-ui/core/styles";

import UInput from "./ui/UInput";
import USelect2 from "./ui/USelect2";
import ResponsiveModal from "./ui/ResponsiveModal";

import MoreInfoNewInvoice from "./MoreInfoNewInvoice";
import EditInvoiceAction from "./EditInvoiceAction";
import {  unitList } from "../../fakeData";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(1),
//   },
//   imagePicker: {
//     height: 50,
//     width: 50,
//   },
// }));

const EditInvoiceItemDialog = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selectedZone = useSelector(
    (state) => state.clients.selectedZone
  );
  const selectedItem = useSelector(
    (state) => state.clients.selectedItemForEdit
  );
  const isModalOpen = useSelector((state) => state.clients.isEditModalOpen);

  const [productCategory, setProductCategory] = useState(
    selectedItem.productCategory
  );
  const [productName, setProductName] = useState(selectedItem.productName);
  const [productCount, setProductCount] = useState(selectedItem.productCount);
  const [productUnit, setProductUnit] = useState(selectedItem.productUnit);
  const [productDesc, setProductDesc] = useState(selectedItem.productDesc);
  const [productImg, setProductImg] = useState(selectedItem.productImg);

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

  const editInvoiceItemHandler = async () => {
    const item = {
      ...selectedItem,
      productCategory,
      productName,
      productCount,
      productUnit,
      productDesc,
      productImg,
    };
    await dispatch(editInvoiceItem(item));
    dispatch(editModalHandler(false));
  };

  const cancelEditHandler = () => {
    dispatch(editModalHandler(false));
  };

  return (
    <ResponsiveModal
      title="ویرایش"
      isOpen={isModalOpen}
      closeHandler={() => dispatch(editModalHandler(false))}
      fullWidth
    >
      {selectedItem.itemId && (
        // <Paper className={classes.paper}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item md={3} xs={12}>
            <USelect2
              inputLabel="انتخاب دسته بندی"
              selectiveData={selectedZone.data}
              onSelect={onSelectCategory}
              selectedItem={productCategory}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <UInput
              type="text"
              label="نام کالای درخواستی"
              value={productName}
              onChangeText={onChangeProductName}
            />
          </Grid>
          <Grid item md={3} xs={6}>
            <UInput
              type="number"
              label="تعداد"
              value={productCount}
              onChangeText={onChangeProductCount}
            />
          </Grid>
          <Grid item md={3} xs={6}>
            <USelect2
              inputLabel="واحد"
              selectiveData={unitList}
              onSelect={onSelectUnit}
              selectedItem={productUnit}
            />
          </Grid>
          <Grid item xs={12}>
            <MoreInfoNewInvoice
              productDesc={productDesc}
              onChangeProductDesc={onChangeProductDesc}
              productImg={productImg}
              onChangeProductImg={onChangeProductImg}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <EditInvoiceAction
                editInvoiceItemHandler={editInvoiceItemHandler}
                cancelEditHandler={cancelEditHandler}
              />
            </Grid>
          </Grid>
        </Grid>
        // </Paper>
      )}
    </ResponsiveModal>
  );
};

export default EditInvoiceItemDialog;
