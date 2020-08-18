import * as acType from "../actions/clientsAction";
import * as p_acType from "../actions/publicAction";

const initialState = {
  provinces: [],
  cities: [],
  parentFields: [],
  fields: [],
  childFields: [],
  units: [],
  expireActivities: [],
  getedClientInvoices: [],
  getedInvoiceById: {},

  selectedProvinces: [],
  selectedCities: [],
  selectedParentField: {},
  selectedField: {},
  selectedChildField: {},
  selectedExpireActivity: {},
  selectedItemForEdit: {},

  newInvoiceItems: [],
  isEditModalOpen: false,
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case p_acType.HTTP_GET_PROVINCES: {
      return {
        ...state,
        provinces: action.payload,
      };
    }

    case p_acType.HTTP_GET_CITIES: {
      return {
        ...state,
        cities: action.payload,
      };
    }

    case p_acType.HTTP_GET_ALL_PARENT_FIELDS: {
      return {
        ...state,
        parentFields: action.payload,
      };
    }

    case p_acType.HTTP_GET_ALL_FIELDS: {
      return {
        ...state,
        fields: action.payload,
      };
    }

    case p_acType.HTTP_GET_ALL_CHILD_FIELDS: {
      return {
        ...state,
        childFields: action.payload,
      };
    }

    case p_acType.HTTP_GET_UNITS: {
      return {
        ...state,
        units: action.payload,
      };
    }

    case p_acType.HTTP_GET_EXPIRE_ACTIVITIES: {
      return {
        ...state,
        expireActivities: action.payload,
        selectedExpireActivity: action.payload[0],
      };
    }

    case acType.HTTP_GET_INVOICES_BY_CLIENT_ID: {
      return {
        ...state,
        getedClientInvoices: action.payload,
      };
    }

    case acType.HTTP_GET_INVOICE_BY_ID: {
      return {
        ...state,
        getedInvoiceById: action.payload,
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

    case acType.SELECT_PARENT_FIELD: {
      return {
        ...state,
        selectedParentField: action.payload,
      };
    }

    case acType.SELECT_FIELD: {
      return {
        ...state,
        selectedField: action.payload,
      };
    }

    case acType.SELECT_CHILD_FIELD: {
      return {
        ...state,
        selectedChildField: action.payload,
      };
    }

    case acType.SELECT_EXPIRE_ACTIVITY: {
      return {
        ...state,
        selectedExpireActivity: action.payload,
      };
    }

    case acType.SELECT_ITEM_FOR_EDIT: {
      return {
        ...state,
        selectedItemForEdit: action.payload,
      };
    }

    case acType.SET_INVOICE_ITEMS_LIST: {
      return {
        ...state,
        newInvoiceItems: action.payload,
      };
    }

    case acType.ADD_NEW_INVOICE_ITEM: {
      const tempNewInvoiceItems = [...state.newInvoiceItems, action.payload];
      return {
        ...state,
        newInvoiceItems: tempNewInvoiceItems,
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

    case acType.EDIT_MODAL_HANDLER: {
      return {
        ...state,
        isEditModalOpen: action.payload,
      };
    }

    default:
      return state;
  }
};

export default clientsReducer;
