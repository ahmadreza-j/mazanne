import React from "react";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import FindReplace from "@material-ui/icons/FindReplace";

import UFab from "./ui/UFab";

const useStyles = makeStyles((theme) => ({
  uploadInput: {
    display: "none",
  },
}));

const ImgUpload = ({ onUploadInputChange, isImgSelected }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      onUploadInputChange(URL.createObjectURL(event.target.files[0]));
    }
  };

  const id = uuidv4();

  return (
    <>
      <input
        accept="image/*"
        className={classes.uploadInput}
        id={id}
        type="file"
        onChange={handleChange}
      />
      <label htmlFor={id}>
        <UFab
          extendedlabel={isImgSelected ? "تغییر عکس" : "افزودن عکس"}
          aria-label="addPhoto"
          size="small"
          component="span"
        >
          {isImgSelected ? <FindReplace /> : <AddAPhotoIcon />}
        </UFab>
      </label>
    </>
  );
};

export default ImgUpload;
