import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import reducersList from "./reducersList";

const rootReducer = combineReducers(reducersList);

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

const ReduxStore = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStore;
