import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import DashboardScreen from "../app/admin/DashboardScreen"
import ProvincesCollectionScreen from "../app/admin/ProvincesCollectionScreen";
import UnitsCollectionScreen from "../app/admin/UnitsCollectionScreen";
import FieldsCollectionScreen from "../app/admin/FieldsCollectionScreen";
import ParentFieldsCollectionScreen from "../app/admin/ParentFieldsCollectionScreen";

const AdminRoutes = ({ children }) => {

  return (
    <BrowserRouter basename="/ar-admin">
      {children}
      <Switch>
        <Route path="/home" component={DashboardScreen} />
        <Route path="/provinces-collection" component={ProvincesCollectionScreen} />
        <Route path="/units-collection" component={UnitsCollectionScreen} />
        <Route path="/parent-fields-collection" component={ParentFieldsCollectionScreen} />
        <Route path="/fields-collection" component={FieldsCollectionScreen} />

        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default AdminRoutes;
