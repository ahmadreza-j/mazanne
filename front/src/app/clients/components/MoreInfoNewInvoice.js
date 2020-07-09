import React from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import UInput from "./ui/UInput";
import ImgUpload from "./ImgUpload";

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
  productDesc,
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
          value={productDesc}
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
            {/* <IconButton
              aria-label="delete"
              onClick={() => uploadImgHandler(null)}
            >
              <DeleteIcon />
            </IconButton> */}
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
