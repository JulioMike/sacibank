const mongoose = require('mongoose');

const Moviment = require('../models/moviment_model');
const Users = require('../models/users_model');

module.exports = Pagamento = async (req, res, next) =>{
    const user_auth = req.auth;
    const { valor, identificador, senha } = req.body;
    let comprovante={}, desconto=0, update={}, resto=0;

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
                if(user_auth.saldo<0){
                    if(valor>user_auth.limiteatual){
                        res.status(404).json({
                            msg: "Você não tem saque e nem limite disponível para movimentação...",
                        });     
                    }else{
                        desconto = user_auth.limiteatual - valor;    

                        update = { saldo: user_auth.saldo - valor, limiteatual: desconto};
                    }
                    
                }else{
                    resto = parseFloat(valor) - user_auth.saldo
                    
                    desconto = user_auth.limiteatual - resto;

                    update = { saldo:resto*(-1), limiteatual: desconto }
                }
                
            } else if (valor <= user_auth.saldo) {
                desconto = user_auth.saldo - parseFloat(valor);
                update = { saldo: desconto };
            }

            const resultusers = await Users.findByIdAndUpdate(user_auth._id, update, {new: true});
            if (!resultusers) {
                res.status(404).json({ message: "Não efetou a movimentação...." });
            }

            const moviment = new Moviment({
                tipo: "PAGAMENTO",
                valor: valor,
                pagamento: identificador,
            });

            const resultmoviment = await moviment.save();

            if (!resultmoviment) {
                res.status(404).json({ message: "Não efetou a movimentação...." });
            }

            comprovante = {
                valorpago: valor,
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
}