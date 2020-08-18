import { GET, POST, PUT, DELETE } from "../../util/httpAxios";

export const httpCreateNewConvertedProvincesCollection = () => {
  return async (dispatch) => {
    const response = await GET(
      "/ar-admin/create-new-converted-provinces-collection"
    );
    console.log(response);
  };
};

export const httpCreateNewConvertedCitiesCollection = () => {
  return async (dispatch) => {
    const response = await GET(
      "/ar-admin/create-new-converted-cities-collection"
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

export const httpCreateNewParentField = (parentField) => {
  return async (dispatch) => {
    const response = await POST(
      "/ar-admin/create-new-parent-field",
      parentField
    );
    console.log(response);
  };
};

export const httpEditParentField = (id, parentField) => {
  return async (dispatch) => {
    const response = await PUT(
      `/ar-admin/edit-parent-field/${id}`,
      parentField
    );
    console.log(response);
  };
};

export const httpDeleteParentField = (id) => {
  return async (dispatch) => {
    const response = await DELETE(`/ar-admin/delete-parent-field/${id}`);
    console.log(response);
  };
};

export const httpAddFieldToParent = (fields) => {
  console.log(fields)
  const reqObj = { fields };
  return async (dispatch) => {
    const response = await POST("/ar-admin/add-field-to-parent", reqObj);
    console.log(response);
  };
};

export const httpAddChildToField = (childFields) => {
  const reqObj = { childFields };
  return async (dispatch) => {
    const response = await POST("/ar-admin/add-child-to-field", reqObj);
    console.log(response);
  };
};

export const httpAddUnitToField = (fieldId, unitsId) => {
  const reqObj = { fieldId, unitsId };
  return async (dispatch) => {
    const response = await POST("/ar-admin/add-unit-to-field", reqObj);
    console.log(response);
  };
};

// export const httpDeleteParentFieldCollection = () => {
//   return async (dispatch) => {
//     const response = await DELETE("/ar-admin/delete-parent-field-collection");
//     console.log(response);
//   };
// };
