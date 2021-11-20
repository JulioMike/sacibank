
const Saldo = require('../service/saldo');
const Saque = require('../service/saque');
const Deposito = require('../service/deposito');

module.exports = {
  outSaque: Saque,
  outSaldo: Saldo,
  inDeposito: Deposito,
};
