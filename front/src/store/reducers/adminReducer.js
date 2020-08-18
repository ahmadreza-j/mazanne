import * as acType from "../actions/adminAction";
import * as p_acType from "../actions/publicAction";

const initialState = {
  units: [],
  parentFields: [],
  fields: [],
  childFields: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case p_acType.HTTP_GET_UNITS: {
      return {
        ...state,
        units: action.payload,
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

    default:
      return state;
  }
};

export default adminReducer;
