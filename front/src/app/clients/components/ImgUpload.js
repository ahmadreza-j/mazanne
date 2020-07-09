import React from "react";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import FindReplace from "@material-ui/icons/FindReplace";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import UFab from "./ui/UFab";

const useStyles = makeStyles((theme) => ({
  uploadInput: {
    display: "none",
  },
}));

const ImgUpload = ({ onUploadInputChange, isImgSelected }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const id1 = uuidv4();
  const id2 = uuidv4();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      onUploadInputChange(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editHandler = () => {
    handleClose();
  };

  const deleteHandler = () => {
    onUploadInputChange(null);
    handleClose();
  };

  return (
    <>
      {!isImgSelected ? (
        <>
          <input
            accept="image/*"
            className={classes.uploadInput}
            id={id1}
            type="file"
            onChange={handleChange}
          />
          <label htmlFor={id1}>
            <UFab
              extendedlabel="افزودن عکس"
              aria-label="addPhoto"
              size="small"
              component="span"
              color="secondary"
            >
              <AddAPhotoIcon />
            </UFab>
          </label>
        </>
      ) : (
        <>
          <UFab
            extendedlabel="ویرایش عکس"
            aria-label="editPhoto"
            size="small"
            aria-controls={id2}
            aria-haspopup="true"
            color="secondary"
            onClick={handleClick}
          >
            <EditIcon/>
          </UFab>
          <Menu
            id={id2}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={editHandler}>
              <input
                accept="image/*"
                className={classes.uploadInput}
                id={id1}
                type="file"
                onChange={handleChange}
              />
              <label htmlFor={id1}>
                <FindReplace color="primary"/>
              </label>
            </MenuItem>
            <MenuItem onClick={deleteHandler}>
              <DeleteIcon color="secondary" />
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default ImgUpload;
