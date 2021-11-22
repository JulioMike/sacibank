const mongoose = require("mongoose");

const Users = require("../models/users_model");
const Moviment = require("../models/moviment_model");

module.exports = Deposito = async (req, res, next) => {

  try {
    const { valor, nome, cpf } = req.body;
    let update = {}, resto = 0, soma = 0;  

    const user = await Users.findOne({cpf});
    
    if (!user) {
      res.status(404).json({ msg: "usuario não existe" });
    }
    
    if (user.saldo==0 && user.limiteatual < user.limite) {
      soma = parseInt(valor) + user.limiteatual;
      
      if (soma > user.limite) {
        resto = soma - user.limite;
        update = { saldo: resto, limiteatual: user.limite };
      
      } else {
        update = { limiteatual: soma };
      
      }

    } else {
      soma =  user.saldo + parseInt(valor);
      update = { saldo:soma };
      
    }

    const deposito = await Users.findByIdAndUpdate(user._id, update, {
      new: true,
    });
    if (!deposito) {
      res.status(404).json({ msg: "valores não foram depositados." });
    }
    
    const moviment = new Moviment({
      tipo: "DEPOSITO",
      valor: valor,
      nome: nome,
      cpf: cpf,
      numeroconta: deposito.numeroconta
    });

    const resultmoviment = await moviment.save();
    
    if (!resultmoviment) {
      res.status(404).json({ message: "Não efetou a movimentação...." });
    }
    
    res.send("Deposito realizado com sucesso.");

  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(
        res
          .status(404)
          .json({ mensagem: "Ocorreu um erro durante a Movimentação..." })
      );
      return;
    }
    next(error);
  }
};
