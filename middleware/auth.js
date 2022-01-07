const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "Authorization deneid",
    });
  }
  try {
    const decoded = jwt.verify(token, config.get("secretKey"));
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(500).json({ msg: "Server erreur", err: error.message });
  }
};
