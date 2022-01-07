const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const config = require("config");

// register user

router.post(
  "/register",
  [
    body("name", "name is required").notEmpty(),
    body("lastname", "last name is required").notEmpty(),
    body("username", "user name is required").notEmpty(),
    body("email", "please enter a valid email").isEmail(),
    body("password", "passwor must bee more then 6 characters ").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastname, username, email, password } = req.body;

    try {
      const userEmail = await User.findOne({ email });
      const userName = await User.findOne({ username });

      if (userEmail) {
        return res.status(400).json({ msg: "Email is already exist!" });
      }
      if (userName) {
        return res.status(400).json({ msg: "user name is already exist!" });
      }
      //  cryptage password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        lastname,
        username,
        email,
        password: passwordHash,
      });

      await user.save();

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get("secretKey"),
        {
          expiresIn: 360000000000,
        },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );

      //   res.json({
      //     msg: "success",
      //     user,
      //   });
    } catch (error) {
      res.status(500).json({ msg: "Server erreur", err: error.message });
    }
  }
);
module.exports = router;
