import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";

import UInput from "../components/ui/UInput";
import ImgUpload from "../components/ImgUpload";

const useStyles = makeStyles((theme) => ({
  // marginTop: {
  //   marginTop: theme.spacing(1),
  // },
  uploadInput: {
    display: "none",
  },
  imgPreview: {
    height: "100px",
    width: "100px",
    borderRadius: "5%",
  },
}));

const MoreInfoNewInvoice = ({
  requestDesc,
  onChangeProductDesc,
  productImg,
  onChangeProductImg,
}) => {
  const classes = useStyles();

  const uploadImgHandler = (file) => {
    onChangeProductImg(file);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={1}
      // className={classes.marginTop}
    >
      <Grid item sm={6} xs={12}>
        <UInput
          type="multiline"
          label="توضیحات بیشتر"
          value={requestDesc}
          onChangeText={onChangeProductDesc}
        />
      </Grid>
      <Grid item>
        <ImgUpload
          onUploadInputChange={uploadImgHandler}
          isImgSelected={productImg ? true : false}
        />
      </Grid>
      {productImg && (
        <Grid item>
          <div>
            <IconButton
              aria-label="delete"
              onClick={() => uploadImgHandler(null)}
            >
              <DeleteIcon />
            </IconButton>
            <img
              className={classes.imgPreview}
              src={productImg}
              alt="preview"
            />
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default MoreInfoNewInvoice;
