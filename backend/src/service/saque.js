const mongoose = require("mongoose");

const Moviment = require("../models/moviment_model");
const Users = require("../models/users_model");

module.exports = Saque = async (req, res, next) => {
  const user_auth = req.auth;
  const { valor, senha } = req.body;
  let desconto = 0,
    uso_limite = false,
    update = {},
    comprovante = {};

  if (!user_auth) {
    res.status(401).json({ msg: "Usuário não está autenticado..." });
  }

  try {
    if (senha == user_auth.senha) {
      if (valor > user_auth.saldo && valor > user_auth.limiteatual) {
        res.status(404).json({
          msg: "Você não tem saque e nem limite disponível para movimentação...",
        });
      } else if (valor > user_auth.saldo && valor <= user_auth.limiteatual) {
        desconto = user_auth.limiteatual - valor;
        uso_limite = true;
      } else if (valor < user_auth.saldo) {
        desconto = user_auth.saldo - valor;
      }

      uso_limite
        ? (update = { limiteatual: desconto })
        : (update = { saldo: desconto });

      const resultusers = await Users.findByIdAndUpdate(user_auth._id, update, {
        new: true,
      });
      if (!resultusers) {
        res.status(404).json({ message: "Não efetou a movimentação...." });
      }

      const moviment = new Moviment({
        tipo: "SAQUE",
        valor: valor,
        numeroconta: user_auth.numeroconta,
      });

      const resultmoviment = await moviment.save();

      if (!resultmoviment) {
        res.status(404).json({ message: "Não efetou a movimentação...." });
      }

      comprovante = {
        valorsacado: valor,
        saldorestante: resultusers.saldo,
        limiterestante: resultusers.limiteatual,
      };

      res.send(comprovante);
    } else {
      res.status(401).json({ message: "Senha incorreta...." });
    }
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(
        res
          .status(400)
          .json({ mensagem: "Ocorreu um erro durante a Movimentação..." })
      );
      return;
    }
    next(error);
  }
};
