import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  editModalHandler,
  editInvoiceItem,
} from "../../../store/actions/clientsAction";

import Grid from "@material-ui/core/Grid";

import UInput from "../components/ui/UInput";
import USelect2 from "../components/ui/USelect2";
import ResponsiveModal from "../components/ui/ResponsiveModal";

import MoreInfoNewInvoice from "../components/MoreInfoNewInvoice";
import EditInvoiceAction from "../components/EditInvoiceAction";
import { unitList } from "../../fakeData";

const EditInvoiceItemDialog = () => {
  const dispatch = useDispatch();
  const selectedSubZone = useSelector((state) => state.clients.selectedSubZone);
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
      {selectedItem.productId && (
        // <Paper className={classes.paper}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item md={3} xs={12}>
            <USelect2
              inputLabel="انتخاب دسته بندی"
              selectiveData={selectedSubZone.data}
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
