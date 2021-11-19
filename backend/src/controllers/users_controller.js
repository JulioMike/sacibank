const mongoose = require("mongoose");

const Users = require("../models/users_model");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const results = await Users.find({}, { __V: 0 });

      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  createUsers: async (req, res, next) => {
    try {
      const users = new Users(req.body);
      const result = await users.save();

      res.send(result);

    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        res.status(422).json({ erro: error.message });
        return;
      }
      next(error);
    }
  },
  findUsersById: async (req, res, next) => {
    const id_r = req.params.id;

    try {
      const users = await Users.findById({ _id: id_r });

      if (!users) {
        res.status(404).json({ mensagem: "Users não existe.." });
      }
      res.send(users);

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

    try {
      const result = await Users.findByIdAndUpdate(id_r, dados_update, {
        new: true,
      });
      if (!result) {
        res.status(404).json({ message: "Users não existe...." });
      }
      res.send(result);
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

    try {
      const result = await Users.findByIdAndDelete(id_r);
      if (!result) {
        res.status(404).json({ msg: "Users não existe..." });
      }
      res.send("usuario excluido com sucesso.");
      
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
