import React from "react";
import "./App.css";
import RTL from "./config/rtl.config";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <RTL>
      <MainRoutes />
    </RTL>
  );
}

export default App;
