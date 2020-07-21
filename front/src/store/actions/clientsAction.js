import { zones, unitList, provinces } from "../../app/fakeData";

export const HTTP_GET_PROVINCES = "HTTP_GET_PROVINCES";
export const SELECT_PROVINCES = "SELECT_PROVINCES";
export const SELECT_CITIES = "SELECT_CITIES";
export const HTTP_GET_ZONES_INFO = "HTTP_GET_ZONES_INFO";
export const SHOW_SELECT_ZONE_HANDLER = "SHOW_SELECT_ZONE_HANDLER";
export const SELECT_ZONE = "SELECT_ZONE";
export const HTTP_GET_UNITS = "HTTP_GET_UNITS";
export const ADD_NEW_INVOICE_ITEM = "ADD_NEW_INVOICE_ITEM";
export const SELECT_ITEM_FOR_EDIT = "SELECT_ITEM_FOR_EDIT";
export const EDIT_INVOICE_ITEM = "EDIT_INVOICE_ITEM";
export const DELETE_INVOICE_ITEM = "DELETE_INVOICE_ITEM";
export const EDIT_MODAL_HANDLER = "EDIT_MODAL_HANDLER";

export const httpGetProvinces = () => {
  return (dispatch) => {
    dispatch({ type: HTTP_GET_PROVINCES, payload: provinces });
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
    dispatch({ type: HTTP_GET_ZONES_INFO, payload: zones });
  };
};

export const showSelectZoneHandler = (boolean) => {
  return (dispatch) => {
    dispatch({ type: SHOW_SELECT_ZONE_HANDLER, payload: boolean });
  };
};

export const selectZone = (zone) => {
  return (dispatch) => {
    dispatch({ type: SELECT_ZONE, payload: zone });
  };
};

export const httpGetUnits = () => {
  return (dispatch) => {
    dispatch({ type: HTTP_GET_UNITS, payload: unitList });
  };
};

export const NewInvoiceCompItem = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_NEW_INVOICE_ITEM, payload: item });
  };
};

export const selectForEdit = (item) => {
  return (dispatch) => {
    dispatch({ type: SELECT_ITEM_FOR_EDIT, payload: item });
  };
};

export const editInvoiceItem = (item) => {
  return (dispatch) => {
    dispatch({ type: EDIT_INVOICE_ITEM, payload: item });
  };
};

export const deleteInvoiceItem = (itemId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_INVOICE_ITEM, payload: itemId });
  };
};

export const editModalHandler = (boolean) => {
  return (dispatch) => {
    dispatch({ type: EDIT_MODAL_HANDLER, payload: boolean });
  };
};

export const scrollToBot = () => {
  return () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
};
