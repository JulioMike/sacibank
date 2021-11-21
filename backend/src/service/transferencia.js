const mongoose = require("mongoose");

const Moviment = require("../models/moviment_model");
const Users = require("../models/users_model");

module.exports = Transferencia = async (req, res, next) => {
  const user_auth = req.auth;
  const { valor, cpf, senha } = req.body;
  let desconto = 0,
    resto = 0,
    resto_destinatario = 0,
    update_emissor = {},
    update_destinatario = {},
    comprovante = {};

  if (!user_auth) {
    res.status(401).json({ msg: "Usuário não está autenticado..." });
  }

  try {
    if (senha == user_auth.senha) {
      const resultcpf = await Users.findOne({ cpf });

      if (!resultcpf) {
        res.status(404).json({ msg: "Não Existe usuario com esse CPF..." });
      }
      if (cpf == user_auth.cpf) {
        res
          .status(404)
          .json({ msg: "Não pode realizar TRANSFERENCIA para si mesmo...." });
      }

      if (valor > user_auth.saldo && valor > user_auth.limiteatual) {
        res.status(404).json({
          msg: "Você não tem saldo e nem limite disponível para movimentação...",
        });
      } else if (valor > user_auth.saldo && valor <= user_auth.limiteatual) {
        if (user_auth.saldo < 0) {
          if (valor > user_auth.limiteatual) {
            res.status(404).json({
              msg: "Você não tem saldo e nem limite disponível para movimentação...",
            });
          } else {
            desconto = user_auth.limiteatual - valor;

            update_emissor = {
              saldo: user_auth.saldo - valor,
              limiteatual: desconto,
            };
          }
        } else {
          resto = parseFloat(valor) - user_auth.saldo;

          desconto = user_auth.limiteatual - resto;

          update_emissor = { saldo: resto * -1, limiteatual: desconto };
        }
      } else if (valor <= user_auth.saldo) {
        desconto = user_auth.saldo - parseFloat(valor);
        update_emissor = { saldo: desconto };
      }

      const resultusers = await Users.findByIdAndUpdate(
        user_auth._id,
        update_emissor,
        {
          new: true,
        }
      );
      if (!resultusers) {
        res.status(404).json({ message: "Não efetou a movimentação...." });
      }

      if (resultcpf.saldo > 0) {
        update_destinatario = { saldo: resultcpf.saldo + parseFloat(valor) };
      } else {
        if (valor > resultcpf.limiteatual) {
          resto_destinatario = parseFloat(valor) - resultcpf.limiteatual;
          update_destinatario = {
            saldo: resto_destinatario,
            limiteatual: resultcpf.limite,
          };
        }
      }

      const atualizarcpf = await Users.findByIdAndUpdate(
        resultcpf._id,
        update_destinatario,
        {
          new: true,
        }
      );
      if (!atualizarcpf) {
        res.status(404).json({ message: "Não efetou a movimentação...." });
      }

      const moviment = new Moviment({
        tipo: "TRANSFERENCIA",
        valor: valor,
        nome: resultcpf.nome,
        numerocontadest: resultcpf.numeroconta,
        numeroconta: user_auth.numeroconta,
      });

      const resultmoviment = await moviment.save();

      if (!resultmoviment) {
        res.status(404).json({ message: "Não efetou a movimentação...." });
      }

      comprovante = {
        nometitular: resultcpf.nome,
        numerocontadest: resultcpf.numeroconta,
        valortransferido: valor,
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
