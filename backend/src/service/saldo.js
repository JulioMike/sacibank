const mongoose = require('mongoose');

const Users = require('../models/users_model');  

module.exports = Saldo = async (req, res, next) => {
    const user_auth = req.auth;
    let saldoatual=0,limitedisp=0,comprovante={};

    if(!user_auth){
        res.status(401).json({ msg: "Usuário não está autenticado..." });
    }

    try{
        const users = await Users.findById({ _id: user_auth._id });

        if (!users) {
            res.status(404).json({ mensagem: "Usuário não existe.." });
        }
        limitedisp = users.limiteatual;

        (users.saldo==0)?(saldoatual= users.limiteatual - users.limite):(saldoatual=users.saldo)

        comprovante= {
            saldo: saldoatual,
            limite: users.limiteatual
        }
        
        res.send(comprovante);

    }catch (error){
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
}