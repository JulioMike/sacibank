
const Saldo = require('../service/saldo');
const Saque = require('../service/saque');
const Deposito = require('../service/deposito');
const Pagamento = require('../service/pagamento');
const Transferencia = require('../service/transferencia');
const Extrato = require('../service/extrato');

module.exports = {
  outSaque: Saque,
  outSaldo: Saldo,
  inDeposito: Deposito,
  outPagamento: Pagamento,
  allTransferencia: Transferencia,
  getExtrato: Extrato
};
