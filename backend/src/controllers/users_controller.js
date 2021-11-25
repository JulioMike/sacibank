const mongoose = require("mongoose");

const Users = require("../models/users_model");

module.exports = {
  getAllUsers: async (req, res) => {
    const user_auth = req.auth;

    try {
      if (user_auth.isAdmin) {
        const results = await Users.find({}, { __V: 0 });

        res.send(results);
      } else {
        res.status(404).json({ msg: "Rota proibida para quem não é Admin..." });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  findUsersById: async (req, res, next) => {
    const id_r = req.params.id;
    const user_auth = req.auth;

    try {
      if (user_auth.isAdmin) {
        const users = await Users.findById({ _id: id_r });

        if (!users) {
          res.status(404).json({ mensagem: "Users não existe.." });
        }
        res.send(users);
      } else {
        res.status(404).json({ msg: "Rota proibida para quem não é Admin..." });
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(res.status(400).json({ mensagem: "Id inválido.." }));
        return;
      }
      next(error);
    }
  },
  updateUsers: async (req, res, next) => {
    const id_r = req.params.id;
    const dados_update = req.body;
    const user_auth = req.auth;

    try {
      if (req.auth.isAdmin) {
        const result = await Users.findByIdAndUpdate(id_r, dados_update, {
          new: true,
        });
        if (!result) {
          res.status(404).json({ message: "Users não existe...." });
        }
        res.send(result);
      } else {
        res.status(404).json({ msg: "Rota proibida para quem não é Admin..." });
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(res.status(400).json({ mensagem: "Id inválido.." }));
        return;
      }
      next(error);
    }
  },
  deleteUsers: async (req, res, next) => {
    const id_r = req.params.id;
    const user_auth = req.auth;

    try {
      if (user_auth.isAdmin) {
        const result = await Users.findByIdAndDelete(id_r);
        if (!result) {
          res.status(404).json({ msg: "Users não existe..." });
        }
        res.send("usuario excluido com sucesso.");
      } else {
        res.status(404).json({ msg: "Rota proibida para quem não é Admin..." });
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(res.status(400).json({ mensagem: "Id inválido.." }));
        return;
      }
      next(error);
    }
  },
};
