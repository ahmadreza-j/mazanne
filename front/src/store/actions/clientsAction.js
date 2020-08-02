import { mainZones } from "../../app/fakeData";
import { GET, POST } from "../../util/httpAxios";

export const HTTP_GET_PROVINCES = "HTTP_GET_PROVINCES";
export const SELECT_PROVINCES = "SELECT_PROVINCES";
export const SELECT_CITIES = "SELECT_CITIES";
export const HTTP_GET_ZONES_INFO = "HTTP_GET_ZONES_INFO";
// export const SHOW_SELECT_ZONE_HANDLER = "SHOW_SELECT_ZONE_HANDLER";
export const SELECT_MAIN_ZONE = "SELECT_MAIN_ZONE";
export const SELECT_SUB_ZONE = "SELECT_SUB_ZONE";
export const HTTP_GET_UNITS = "HTTP_GET_UNITS";
export const ADD_NEW_INVOICE_ITEM = "ADD_NEW_INVOICE_ITEM";
export const SELECT_ITEM_FOR_EDIT = "SELECT_ITEM_FOR_EDIT";
export const EDIT_MODAL_HANDLER = "EDIT_MODAL_HANDLER";
export const EDIT_INVOICE_ITEM = "EDIT_INVOICE_ITEM";
export const DELETE_INVOICE_ITEM = "DELETE_INVOICE_ITEM";
export const HTTP_CREATE_NEW_INVOICE = "HTTP_CREATE_NEW_INVOICE";
export const RESET_INVOICE_ITEMS = "RESET_INVOICE_ITEMS";
export const HTTP_GET_INVOICES_BY_CLIENT_ID = "HTTP_GET_INVOICES_BY_CLIENT_ID";

export const httpGetProvinces = () => {
  return async (dispatch) => {
    const response = await GET("/public/get-provinces");
    dispatch({ type: HTTP_GET_PROVINCES, payload: response.result });
  };
};

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

export const httpGetZonesInfo = () => {
  return (dispatch) => {
    dispatch({ type: HTTP_GET_ZONES_INFO, payload: mainZones });
  };
};

// export const showSelectZoneHandler = (boolean) => {
//   return (dispatch) => {
//     dispatch({ type: SHOW_SELECT_ZONE_HANDLER, payload: boolean });
//   };
// };

export const selectMainZone = (mainZone) => {
  return (dispatch) => {
    dispatch({ type: SELECT_MAIN_ZONE, payload: mainZone });
  };
};

export const selectSubZone = (subZone) => {
  return (dispatch) => {
    dispatch({ type: SELECT_SUB_ZONE, payload: subZone });
  };
};

export const httpGetUnits = () => {
  return async (dispatch) => {
    const response = await GET("/public/get-units");
    dispatch({ type: HTTP_GET_UNITS, payload: response.result });
  };
};

export const addNewInvoiceItem = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_NEW_INVOICE_ITEM, payload: item });
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

export const httpCreateNewInvoice = (invoice) => {
  return async (dispatch) => {
    const response = await POST("/client/create-new-invoice", invoice);
    console.log(invoice);
    console.log(response);
    // dispatch({ type: HTTP_CREATE_NEW_INVOICE, payload: response });
  };
};

export const resetInvoiceItems = () => {
  return (dispatch) => {
    dispatch({ type: RESET_INVOICE_ITEMS });
  };
};

export const httpGetInvoicesByClientId = (clientId) => {
  return async (dispatch) => {
    const response = await GET(`/client/get-invoices-by-client-id/${clientId}`);
    console.log(response)
    dispatch({
      type: HTTP_GET_INVOICES_BY_CLIENT_ID,
      payload: response.result,
    });
  };
};

export const scrollToBot = () => {
  return () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
};
