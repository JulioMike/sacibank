const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connection } = require("./config/connect");
const app = express();

const users_routes = require("./routes/users_routes");
const auth_routes = require("./routes/auth_routes.js");
const moviment_routes = require("./routes/moviment_routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(users_routes);
app.use(auth_routes);
app.use(moviment_routes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
