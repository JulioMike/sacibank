const Auth = require("../config/auth");

const Users = require("../models/users_model");

module.exports = {
  authMiddleware: async (req, res, next) => {
    let [, token] = [0, 0];

    if (req.headers.authorization) {
      [, token] = req.headers.authorization.split(" ");
    }

    if (token == 0) {
      res.status(401).json({ msg: "sem autorização.." });
      next();
    }

    try {
      if (token != 0) {
        const payload = await Auth.Decode(token);
        const user = await Users.findById(payload.user);

        if (!user) {
          res.status(401).json({ msg: "não tem tokem..." });
        }

        req.auth = user;

        next();
      }
    } catch (error) {
      res.send(401, error);
    }
  },
};
