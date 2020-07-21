import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import clientTheme from "../app/Theme";
import providerTheme from "../app/Theme";

import ClientRoutes from "../routes/ClientRoutes";
import ProviderRoutes from "../routes/ProviderRoutes";

import Header from "../app/shared/Header";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/clients"
          component={() => (
            <ThemeProvider theme={clientTheme}>
              <ClientRoutes>
                <Header headerTitle="مشتریان" />
              </ClientRoutes>
            </ThemeProvider>
          )}
        />
        <Route
          path="/providers"
          component={() => (
            <ThemeProvider theme={providerTheme}>
              <ProviderRoutes>
                <Header headerTitle="خدمات دهندگان" />
              </ProviderRoutes>
            </ThemeProvider>
          )}
        />
        <Redirect to="/clients" />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRoutes;
