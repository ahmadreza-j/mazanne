import React from "react";
import { v4 as uuidv4 } from "uuid";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const ResponsiveModal = ({
  isOpen,
  closeHandler,
  title,
  children,
  ...restProps
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Dialog
        {...restProps}
        fullScreen={fullScreen}
        open={isOpen}
        onClose={closeHandler}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id={uuidv4()}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ResponsiveModal;
