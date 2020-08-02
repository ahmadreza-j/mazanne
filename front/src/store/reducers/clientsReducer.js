import * as acType from "../actions/clientsAction";

const initialState = {
  provinces: [],
  selectedProvinces: [],
  selectedCities: [],
  // isShowSelectZone: true,
  zones: [],
  selectedMainZone: {},
  selectedSubZone: {},
  units: [],
  newInvoiceItems: [],
  selectedItemForEdit: {},
  isEditModalOpen: false,
  getedInvoices: [],
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case acType.HTTP_GET_PROVINCES: {
      return {
        ...state,
        provinces: action.payload,
      };
    }

    case acType.SELECT_PROVINCES: {
      return {
        ...state,
        selectedProvinces: action.payload,
      };
    }

    case acType.SELECT_CITIES: {
      return {
        ...state,
        selectedCities: action.payload,
      };
    }

    case acType.HTTP_GET_ZONES_INFO: {
      return {
        ...state,
        zones: action.payload,
      };
    }

    // case acType.SHOW_SELECT_ZONE_HANDLER: {
    //   return {
    //     ...state,
    //     isShowSelectZone: action.payload,
    //   };
    // }

    case acType.SELECT_MAIN_ZONE: {
      return {
        ...state,
        selectedMainZone: action.payload,
      };
    }

    case acType.SELECT_SUB_ZONE: {
      return {
        ...state,
        selectedSubZone: action.payload,
      };
    }

    case acType.HTTP_GET_UNITS: {
      return {
        ...state,
        units: action.payload,
      };
    }

    case acType.ADD_NEW_INVOICE_ITEM: {
      const tempNewInvoiceItems = [...state.newInvoiceItems, action.payload];
      return {
        ...state,
        newInvoiceItems: tempNewInvoiceItems,
      };
    }

    case acType.SELECT_ITEM_FOR_EDIT: {
      return {
        ...state,
        selectedItemForEdit: action.payload,
      };
    }

    case acType.EDIT_MODAL_HANDLER: {
      return {
        ...state,
        isEditModalOpen: action.payload,
      };
    }

    case acType.EDIT_INVOICE_ITEM: {
      const tempNewInvoiceItems = [...state.newInvoiceItems];
      const selectedItemIndexForEdit = tempNewInvoiceItems.findIndex((item) => {
        return item.productId === action.payload.productId;
      });
      tempNewInvoiceItems[selectedItemIndexForEdit] = action.payload;

      return {
        ...state,
        newInvoiceItems: tempNewInvoiceItems,
      };
    }

    case acType.DELETE_INVOICE_ITEM: {
      const tempNewInvoiceItems = [...state.newInvoiceItems];
      const selectedItemIndexForDelete = tempNewInvoiceItems.findIndex(
        (item) => item.productId === action.payload
      );
      tempNewInvoiceItems.splice(selectedItemIndexForDelete, 1);

      return {
        ...state,
        newInvoiceItems: tempNewInvoiceItems,
      };
    }

    case acType.HTTP_GET_INVOICES_BY_CLIENT_ID: {
      return {
        ...state,
        getedInvoices: action.payload,
      };
    }

    default:
      return state;
  }
};

export default clientsReducer;
