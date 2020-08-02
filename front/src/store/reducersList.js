import clientsReducer from "./reducers/clientsReducer";
import adminReducer from "./reducers/adminReducer";

const reducersList = {
  clients: clientsReducer,
  admin: adminReducer,
};

export default reducersList;
