import { GET, POST, PUT, DELETE } from "../../util/httpAxios";

export const HTTP_FETCH_UNITS = "HTTP_FETCH_UNITS";

export const httpCreateNewConvertedProvincesCollection = () => {
  return async (dispatch) => {
    const response = await GET(
      "/ar-admin/create-new-converted-provinces-collection"
    );
    console.log(response);
  };
};

export const httpDeleteConvertedProvincesCollection = () => {
  return async (dispatch) => {
    const response = await GET(
      "/ar-admin/delete-converted-provinces-collection"
    );
    console.log(response);
  };
};

export const httpCreateNewUnit = (unit) => {
  return async (dispatch) => {
    const response = await POST("/ar-admin/create-new-unit", unit);
    console.log(response);
  };
};

export const httpFetchUnits = () => {
  return async (dispatch) => {
    const response = await GET("/ar-admin/fetch-units");
    console.log(response);
    dispatch({ type: HTTP_FETCH_UNITS, payload: response.result });
  };
};

export const httpEditUnit = (id, unit) => {
  return async (dispatch) => {
    const response = await PUT(`/ar-admin/edit-unit/${id}`, unit);
    console.log(response);
  };
};

export const httpDeleteUnit = (id) => {
  return async (dispatch) => {
    const response = await DELETE(`/ar-admin/delete-unit/${id}`);
    console.log(response);
  };
};
