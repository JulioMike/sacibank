const mongoose = require("mongoose");

const validarEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validarCPF = (cpf) => {
  let re = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/;
  return re.test(cpf);
};

const usersSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validarEmail],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  senha: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    validate: [validarCPF],
  },
  celular: { type: Number, required: true },
  saldo: {type:Number, default: 0.00},
  limite: { type: Number, required: true },
  limiteatual: { type: Number, required: true},
  numeroconta: { type: String, required: true, unique: true },
  isAdmin: {type:Boolean, default:false}
});

const users_model = mongoose.model("users", usersSchema);

module.exports = users_model;
