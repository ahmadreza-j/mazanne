import React from "react";
import "./App.css";
import RTL from "./app/rtl.config";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./app/Theme";
import ClientHome from "./app/clients/pages/ClientHome";
// import SelectZoneDialog from "./app/clients/components/SelectZoneDialog";

function App() {
  return (
    <RTL>
      <ThemeProvider theme={theme}>
        <ClientHome />
        {/* <SelectZoneDialog /> */}
      </ThemeProvider>
    </RTL>
  );
}

export default App;
