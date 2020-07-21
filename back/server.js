const express = require("express");
const bodyParser = require("body-parser");

const testRoutes = require("./routes/test-routes");

const port = 4000;
const app = express();

app.use(bodyParser.json());

app.use('/api/test', testRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));
