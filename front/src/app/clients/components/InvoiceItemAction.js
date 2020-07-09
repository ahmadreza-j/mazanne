import React from "react";
import { v4 as uuidv4 } from "uuid";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function SimpleMenu({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const id = uuidv4();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editHandler = () => {
    onEdit();
    handleClose();
  };

  const deleteHandler = () => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="showMore"
        aria-controls={id}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={editHandler}>
          <EditIcon color="primary" />
        </MenuItem>
        <MenuItem onClick={deleteHandler}>
          <DeleteIcon color="secondary" />
        </MenuItem>
      </Menu>
    </>
  );
}
