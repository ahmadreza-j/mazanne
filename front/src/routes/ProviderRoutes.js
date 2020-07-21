import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const ProviderRoutes = ({ children }) => {
  return (
    <BrowserRouter basename="/providers">
      {children}
      <Switch>
        <Route path="/home" component={() => <h1>providers homepage</h1>} />
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default ProviderRoutes;
