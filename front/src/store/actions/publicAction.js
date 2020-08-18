import { GET, POST, PUT, DELETE } from "../../util/httpAxios";

export const HTTP_GET_PROVINCES = "HTTP_GET_PROVINCES";
export const HTTP_GET_CITIES = "HTTP_GET_CITIES";
export const HTTP_GET_ALL_PARENT_FIELDS = "HTTP_GET_ALL_PARENT_FIELDS";
export const HTTP_GET_ALL_FIELDS = "HTTP_GET_ALL_FIELDS";
export const HTTP_GET_ALL_CHILD_FIELDS = "HTTP_GET_ALL_CHILD_FIELDS";
export const HTTP_GET_UNITS = "HTTP_GET_UNITS";
export const HTTP_GET_EXPIRE_ACTIVITIES = "HTTP_GET_EXPIRE_ACTIVITIES";

export const httpGetProvinces = () => {
  return async (dispatch) => {
    const response = await GET("/public/get-provinces");
    const result = response.result;
    dispatch({ type: HTTP_GET_PROVINCES, payload: result });
    return result;
  };
};

export const httpGetCities = (type) => {
  return async (dispatch) => {
    const response = await GET(`/public/get-cities/${type}`);
    const result = response.result;
    dispatch({ type: HTTP_GET_CITIES, payload: result });
    return result;
  };
};

export const httpGetAllParentFields = () => {
  return async (dispatch) => {
    const response = await GET("/public/get-all-parent-fields");
    console.log(response);
    const result = response.result;
    dispatch({ type: HTTP_GET_ALL_PARENT_FIELDS, payload: result });
    return result;
  };
};

export const httpGetAllFields = (type) => {
  return async (dispatch) => {
    const response = await GET(`/public/get-all-fields/${type}`);
    console.log(response);
    const result = response.result;
    dispatch({ type: HTTP_GET_ALL_FIELDS, payload: result });
    return result;
  };
};

export const httpGetAllChildFields = (type) => {
  return async (dispatch) => {
    const response = await GET(`/public/get-all-child-fields/${type}`);
    const result = response.result;
    dispatch({ type: HTTP_GET_ALL_CHILD_FIELDS, payload: result });
    return result;
  };
};

export const httpGetUnits = () => {
  return async (dispatch) => {
    const response = await GET("/public/get-units");
    const result = response.result;
    dispatch({ type: HTTP_GET_UNITS, payload: result });
    return result;
  };
};

export const httpGetExpireActivities = () => {
  return async (dispatch) => {
    const response = await GET("/public/get-expire-activities");
    const result = response.result;
    dispatch({ type: HTTP_GET_EXPIRE_ACTIVITIES, payload: result });
    return result;
  };
};
