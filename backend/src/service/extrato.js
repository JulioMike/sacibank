const mongoose = require("mongoose");

const Moviment = require("../models/moviment_model");

module.exports = Extrato = async (req, res, next) => {
  const user_auth = req.auth;
  const { datainicio, datafinal, senha } = req.body;

  if (!user_auth) {
    res.status(401).json({ msg: "Usuário não está autenticado..." });
  }

  try {
    if (senha == user_auth.senha) {
      if (datainicio > datafinal) {
        res
          .status(404)
          .json({ message: "ERRO! Data inicio maior que Data final...." });
      }
      if (datafinal > Date.now()) {
        res
          .status(404)
          .json({ message: "ERRO! Data final maior que a Data de Hoje...." });
      }

      const result = await Moviment.find({
        numeroconta: req.auth.numeroconta,
        created_at: { $gte: datainicio, $lt: datafinal },
      });
      if (!result) {
        res.status(404).json({ message: "ERRO! movimentacao não efetou...." });
      }

      res.send(result);
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
