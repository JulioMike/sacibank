const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/desafio";

const connection = mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then((resp) => {
    if (resp) console.log("Conectado ao MongoDB: ", url);
  })
  .catch((err) => {
    if (err) throw err;
  });

module.exports = connection;
