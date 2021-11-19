const Auth = require("../config/auth");

const Users = require("../models/users_model");

module.exports = {
  authMiddleware: async (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ");

    try {
      const payload = await Auth.Decode(token);
      const user = await Users.findById(payload.user);

      if (!user) {
        res.status(401).json({ msg: "não tem tokem..." });
      }
      
      req.auth = user
      
      next();
    } catch (error) {
      res.send(401, error);
    }
  },
};
