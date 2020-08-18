import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { useParams } from "react-router-dom";
import ClientHomeScreen from "../app/clients/pages/ClientHomeScreen";
// import SelectCityScreen from "../app/clients/pages/NewInvoice/SelectCityScreen";
// import SelectZoneScreen from "../app/clients/pages/NewInvoice/SelectZoneScreen";
// import InactiveInvoiceScreen from "../app/clients/pages/NewInvoice/InactiveInvoiceScreen";
import InvoiceScreen from "../app/clients/pages/Invoice/InvoiceScreen"

const ClientRoutes = ({ children }) => {
  const selectedCities = useSelector((state) => state.clients.selectedCities);

  return (
    <BrowserRouter basename="/clients">
      {children}
      <Switch>
        <Route path="/home" component={ClientHomeScreen} />
        {/* <Route path="/invoice/step-1" component={SelectCityScreen} />
        <Route path="/invoice/step-2" component={SelectZoneScreen} /> */}
        <Route path="/invoice/:status/:id" component={InvoiceScreen} />

        {/* {selectedCities.length > 0 && (
          <Route path="/select-zone" component={() => <h1>Select Zone</h1>} />
        )} */}

        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default ClientRoutes;
