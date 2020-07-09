import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Routes = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route
          path="/providers"
          component={() => <h1>providers homepage</h1>}
        />
        <Route
          path="/clients/new-invoice"
          component={() => <h1>clients homepage</h1>}
        />
        <Route path="/clients" component={() => <h1>clients homepage</h1>} />
        <Route path="/" component={() => <h1>main homepage</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
