import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";

import ListIcon from "@material-ui/icons/List";
import LabelIcon from "@material-ui/icons/Label";
import DescriptionIcon from "@material-ui/icons/Description";

import ConfirmDialog from "../components/ui/ConfirmDialog";
import InvoiceItemAction from "../components/InvoiceItemAction";

import {
  selectForEdit,
  deleteInvoiceItem,
  editModalHandler,
} from "../../../store/actions/clientsAction";

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.ultraLight,
  },
  imgPreview: {
    height: "50px",
    width: "50px",
    borderRadius: "5%",
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  indexCounter: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.light,
    height: 24,
    width: 24,
    padding: 12,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: "0px 12px",
  },
  hashtag: {
    paddingLeft: 6,
  },
}));

export default function NewInvoiceCardList({ tableData }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const selectForEditHandler = async (item) => {
    await dispatch(selectForEdit(item));
    dispatch(editModalHandler(true));
  };

  const confirmDeleteDialogHandler = (item) => {
    setSelectedItem(item);
    setIsOpenHandler(true);
  };

  const deleteInvoiceItemHandler = () => {
    dispatch(deleteInvoiceItem(selectedItem.productId));
    setIsOpenHandler(false);
  };

  const setIsOpenHandler = (boolean) => {
    setIsOpen(boolean);
  };

  return (
    <>
      {tableData.map((item, index) => (
        <Slide
          direction="up"
          in={true}
          mountOnEnter
          unmountOnExit
          key={item.productId}
        >
          <Paper className={classes.card}>
            <div className={classes.topRow}>
              <div className={classes.indexCounter}>
                <Typography variant="h6">{index + 1}</Typography>
              </div>
              <InvoiceItemAction
                onEdit={() => selectForEditHandler(item)}
                onDelete={() => confirmDeleteDialogHandler(item)}
              />
            </div>
            <div className={classes.contentContainer}>
              <div className={classes.row}>
                <ListIcon />
                <Typography variant="body1">
                  {item.productCategory.label}
                </Typography>
              </div>
              <div className={classes.row}>
                <LabelIcon />
                <Typography variant="body1">{item.productName}</Typography>
              </div>
              <div className={classes.row}>
                <Typography className={classes.hashtag} variant="h5">
                  #
                </Typography>
                <Typography
                  className={classes.contentContainer}
                  variant="body1"
                >
                  {item.productCount}
                </Typography>
                <Typography
                  className={classes.contentContainer}
                  variant="body1"
                >
                  {item.productUnit.label}
                </Typography>
              </div>

              {item.productDesc && (
                <div className={classes.row}>
                  <DescriptionIcon />
                  <Typography variant="body1">{item.productDesc}</Typography>
                </div>
              )}
              {item.productImg && (
                <img
                  className={classes.imgPreview}
                  src={item.productImg}
                  alt="preview"
                />
              )}
            </div>
          </Paper>
        </Slide>
      ))}
      <ConfirmDialog
        title="از حذف مطمعن هستید؟"
        text={selectedItem.productName && selectedItem.productName}
        isOpen={isOpen}
        setIsOpen={setIsOpenHandler}
        confirmAction={deleteInvoiceItemHandler}
      />
    </>
  );
}
