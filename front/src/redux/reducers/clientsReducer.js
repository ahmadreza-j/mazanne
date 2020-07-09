import * as acType from "../actions/clientsAction";

const initialState = {
  zones: [],
  isShowSelectZone: true,
  selectedZone: {},
  // selectedZone: {
  //   id: "0",
  //   value: 0,
  //   label: "انتخاب نشده",
  //   data: [{ id: "00", value: 0, label: "انتخاب دسته بندی" }],
  // },
  units: [],
  newInvoiceItems: [],
  selectedItemForEdit: {},
  isEditModalOpen: false,
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case acType.HTTP_GET_ZONES_INFO: {
      return {
        ...state,
        zones: action.payload,
      };
    }

    case acType.SHOW_SELECT_ZONE_HANDLER: {
      return {
        ...state,
        isShowSelectZone: action.payload,
      };
    }

    case acType.SELECT_ZONE: {
      return {
        ...state,
        selectedZone: action.payload,
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
        return item.itemId === action.payload.itemId;
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
        (item) => item.itemId === action.payload
      );
      tempNewInvoiceItems.splice(selectedItemIndexForDelete, 1);

      return {
        ...state,
        newInvoiceItems: tempNewInvoiceItems,
      };
    }

    default:
      return state;
  }
};

export default clientsReducer;
