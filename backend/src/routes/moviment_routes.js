const express = require('express');
const router = express.Router();

const moviment_controller = require('../controllers/moviment_controller');

const midd = require('../middleware/authMiddleare');

router.post('/saque',midd.authMiddleware ,moviment_controller.outSaque);
router.get('/saldo',midd.authMiddleware,moviment_controller.outSaldo);
router.post('/deposito', moviment_controller.inDeposito);
router.post('/pagamento',midd.authMiddleware,moviment_controller.outPagamento);
router.post('/transferencia', midd.authMiddleware, moviment_controller.allTransferencia);
router.post('/extrato',midd.authMiddleware,moviment_controller.getExtrato);

module.exports = router;
