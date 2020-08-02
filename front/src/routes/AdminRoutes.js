import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import DashboardScreen from "../app/admin/DashboardScreen"
import ProvincesCollectionScreen from "../app/admin/ProvincesCollectionScreen";
import UnitsCollectionScreen from "../app/admin/UnitsCollectionScreen";

const AdminRoutes = ({ children }) => {

  return (
    <BrowserRouter basename="/ar-admin">
      {children}
      <Switch>
        <Route path="/home" component={DashboardScreen} />
        <Route path="/provinces-collection" component={ProvincesCollectionScreen} />
        <Route path="/units-collection" component={UnitsCollectionScreen} />

        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default AdminRoutes;
