import React from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  title,
  text,
  isOpen,
  setIsOpen,
  confirmAction,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id={uuidv4()}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={uuidv4()}>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmAction} color="primary">
          بله
        </Button>
        <Button onClick={() => setIsOpen(false)} color="primary" autoFocus>
          خیر
        </Button>
      </DialogActions>
    </Dialog>
  );
}
