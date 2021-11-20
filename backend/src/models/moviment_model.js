const mongoose = require("mongoose");

const movimentSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  valor: {type: Number, required:true},
  nome: {type:String},
  cpf: {type: String},
  pagamento: {type:String},
  numeroconta:{type:Number, required:true},
  date: { type: Date, default: Date.now() },
});

const movimentModel = mongoose.model("moviment", movimentSchema);

module.exports = movimentModel;
