import * as acType from "../actions/adminAction";

const initialState = {
  units: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case acType.HTTP_FETCH_UNITS: {
      return {
        ...state,
        units: action.payload,
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
