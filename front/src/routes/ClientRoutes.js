import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ClientHomeScreen from "../app/clients/pages/ClientHomeScreen";
import SelectCityScreen from "../app/clients/pages/NewInvoice/SelectCityScreen";
import NewInvoiceScreen from "../app/clients/pages/NewInvoice/NewInvoiceScreen";

const ClientRoutes = ({ children }) => {
  const selectedCities = useSelector((state) => state.clients.selectedCities);

  return (
    <BrowserRouter basename="/clients">
      {children}
      <Switch>
        <Route path="/home" component={ClientHomeScreen} />
        <Route path="/inbox" component={() => <h1>Inbox</h1>} />
        <Route path="/select-province-city" component={SelectCityScreen} />
        <Route path="/select-zone" component={() => <h1>Select Zone</h1>} />
        {/* {selectedCities.length > 0 && (
          <Route path="/select-zone" component={() => <h1>Select Zone</h1>} />
        )} */}

        <Route path="/new-invoice" component={NewInvoiceScreen} />
        <Route path="/archive" component={() => <h1>Archive</h1>} />
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default ClientRoutes;
