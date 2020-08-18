import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";

import ConfirmDialog from "../components/ui/ConfirmDialog";
import InvoiceItemAction from "../components/InvoiceItemAction";
import { availIdentifire } from "../../../util/availIdentifire";
import serverUrl from "../../../util/serverUrl";

import {
  selectForEdit,
  deleteInvoiceItem,
  editModalHandler,
} from "../../../store/actions/clientsAction";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  container: {
    // maxHeight: `100%`,
    // overflow: `auto`,
  },
  table: {},
  imgPreview: {
    height: "50px",
    width: "50px",
    borderRadius: "5%",
  },
}));

export default function CustomizedTables({ tableData }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const isMoreDesc = () => {
    return tableData.some((item) => item.productDesc);
  };
  const isMoreImg = () => {
    return tableData.some((item) => item.productImg);
  };

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
      <TableContainer component={Paper} className={classes.container}>
        <Table
          className={classes.table}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">دسته بندی</StyledTableCell>
              <StyledTableCell align="center">نام کالا</StyledTableCell>
              <StyledTableCell align="center">تعداد</StyledTableCell>
              <StyledTableCell align="center">واحد</StyledTableCell>
              {isMoreDesc() && (
                <StyledTableCell align="center">توضیحات</StyledTableCell>
              )}
              {isMoreImg() && (
                <StyledTableCell align="center">عکس</StyledTableCell>
              )}

              <StyledTableCell align="center">ویرایش</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <Slide
                direction="up"
                in={true}
                mountOnEnter
                unmountOnExit
                key={availIdentifire(item)}
              >
                <StyledTableRow>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.productChildField.label}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.productName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.productCount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.productUnit.label}
                  </StyledTableCell>
                  {isMoreDesc() && (
                    <StyledTableCell align="center">
                      {item.productDesc}
                    </StyledTableCell>
                  )}
                  {isMoreImg() && (
                    <StyledTableCell align="center">
                      {item.productImg && (
                        <img
                          className={classes.imgPreview}
                          src={
                            item.productImg.preview
                              ? item.productImg.preview
                              : `${serverUrl}/${item.productImg}`
                          }
                          alt="preview"
                        />
                      )}
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    <InvoiceItemAction
                      onEdit={() => selectForEditHandler(item)}
                      onDelete={() => confirmDeleteDialogHandler(item)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              </Slide>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
