const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const publicRoutes = require("./routes/public-routes");
const adminRoutes = require("./routes/admin-routes");
const clientRoutes = require("./routes/client-routes");

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/public", publicRoutes);
app.use("/api/ar-admin", adminRoutes);
app.use("/api/client", clientRoutes);

mongoose
  .connect("mongodb://localhost:27017/mazanne", { useNewUrlParser: true })
  .then(app.listen(port, () => console.log(`listening on port ${port}`)))
  .catch((error) => console.warn("warning!", error));
