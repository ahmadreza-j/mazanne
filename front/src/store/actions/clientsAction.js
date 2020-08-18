import { GET, POST } from "../../util/httpAxios";

export const SELECT_PROVINCES = "SELECT_PROVINCES";
export const SELECT_CITIES = "SELECT_CITIES";
// export const SHOW_SELECT_ZONE_HANDLER = "SHOW_SELECT_ZONE_HANDLER";
export const SELECT_PARENT_FIELD = "SELECT_PARENT_FIELD";
export const SELECT_FIELD = "SELECT_FIELD";
export const SELECT_CHILD_FIELD = "SELECT_CHILD_FIELD";
export const SELECT_EXPIRE_ACTIVITY = "SELECT_EXPIRE_ACTIVITY";
export const SELECT_ITEM_FOR_EDIT = "SELECT_ITEM_FOR_EDIT";
export const EDIT_MODAL_HANDLER = "EDIT_MODAL_HANDLER";
export const SET_INVOICE_ITEMS_LIST = "SET_INVOICE_ITEMS_LIST";
export const ADD_NEW_INVOICE_ITEM = "ADD_NEW_INVOICE_ITEM";
export const EDIT_INVOICE_ITEM = "EDIT_INVOICE_ITEM";
export const DELETE_INVOICE_ITEM = "DELETE_INVOICE_ITEM";
export const RESET_INVOICE_ITEMS = "RESET_INVOICE_ITEMS";
export const HTTP_CREATE_NEW_INVOICE = "HTTP_CREATE_NEW_INVOICE";
export const HTTP_GET_INVOICES_BY_CLIENT_ID = "HTTP_GET_INVOICES_BY_CLIENT_ID";
export const HTTP_GET_INVOICE_BY_ID = "HTTP_GET_INVOICE_BY_ID";

export const selectProvinces = (provinces) => {
  return (dispatch) => {
    dispatch({ type: SELECT_PROVINCES, payload: provinces });
  };
};

export const selectCities = (cities) => {
  return (dispatch) => {
    dispatch({ type: SELECT_CITIES, payload: cities });
  };
};

export const selectParentField = (parentField) => {
  return (dispatch) => {
    dispatch({ type: SELECT_PARENT_FIELD, payload: parentField });
  };
};

export const selectField = (field) => {
  return (dispatch) => {
    dispatch({ type: SELECT_FIELD, payload: field });
  };
};

export const selectChildField = (childField) => {
  return (dispatch) => {
    dispatch({ type: SELECT_CHILD_FIELD, payload: childField });
  };
};

export const selectExpireActivity = (expireActivity) => {
  return (dispatch) => {
    dispatch({ type: SELECT_EXPIRE_ACTIVITY, payload: expireActivity });
  };
};

export const selectForEdit = (item) => {
  return (dispatch) => {
    dispatch({ type: SELECT_ITEM_FOR_EDIT, payload: item });
  };
};

export const editModalHandler = (boolean) => {
  return (dispatch) => {
    dispatch({ type: EDIT_MODAL_HANDLER, payload: boolean });
  };
};

export const setInvoiceItemsList = (list) => {
  return (dispatch) => {
    dispatch({ type: SET_INVOICE_ITEMS_LIST, payload: list });
  };
};

export const addNewInvoiceItem = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_NEW_INVOICE_ITEM, payload: item });
  };
};

export const editInvoiceItem = (item) => {
  return (dispatch) => {
    dispatch({ type: EDIT_INVOICE_ITEM, payload: item });
  };
};

export const deleteInvoiceItem = (productId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_INVOICE_ITEM, payload: productId });
  };
};

export const resetInvoiceItems = () => {
  return (dispatch) => {
    dispatch({ type: RESET_INVOICE_ITEMS });
  };
};

export const httpCreateNewInvoice = (invoice) => {
  return async (dispatch) => {
    const response = await POST("/client/create-new-invoice", invoice);
    console.log(invoice);
    console.log(response);
    // dispatch({ type: HTTP_CREATE_NEW_INVOICE, payload: response });
  };
};

export const httpGetInvoicesByClientId = (clientId) => {
  return async (dispatch) => {
    const response = await GET(`/client/get-invoices-by-client-id/${clientId}`);
    const result = response.result;
    console.log(response);
    dispatch({
      type: HTTP_GET_INVOICES_BY_CLIENT_ID,
      payload: response.result,
    });
    return result;
  };
};

export const httpGetInvoiceById = (invoiceId) => {
  return async (dispatch) => {
    const response = await GET(`/client/get-invoice-by-id/${invoiceId}`);
    const result = response.result;
    console.log(response);
    dispatch({
      type: HTTP_GET_INVOICE_BY_ID,
      payload: result,
    });
    return result;
  };
};

export const scrollToBot = () => {
  return () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
};
