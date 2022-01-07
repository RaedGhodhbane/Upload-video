const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");

// login user

router.post(
  "/login",
  [
    body("username", "user name is required").notEmpty(),
    body("password", "passwor must bee more then 6 characters ").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Invalid Credentials!" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      //  cryptage password
      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials!" }] });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get("secretKey"),
        {
          expiresIn: 3600000000000,
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

// get user profile

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server erreur", err: error.message });
  }
});

// update profile

router.post(
  "/editprofile",
  [
    auth,
    [
      body("name", "name is required").notEmpty(),
      body("lastname", "last name is required").notEmpty(),
      body("username", "user name is required").notEmpty(),
      body("email", "please enter a valid email").isEmail(),
      body("password", "passwor must bee more then 6 characters ").isLength({
        min: 6,
      }),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastname, username, email, password } = req.body;

    try {
      const user = await User.findById(req.user.id);
      // console.log(user);
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      let newPr = {
        name,
        lastname,
        username,
        email,
        password: passwordHash,
      };

      const newUserProfile = await User.findOneAndUpdate(
        {
          user: req.user.id,
        },
        {
          $set: newPr,
        },
        {
          new: true,
        }
      );
      res.json({
        msg: "profile updated with success",
      });
    } catch (error) {
      res.status(500).json({ msg: "Server erreur", err: error.message });
    }
  }
);

// get all users
router.get("/getusers", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server erreur", err: error.message });
  }
});

// delete user

router.delete("/deleteuser/:id", auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({
      msg: "user deleted successfuly",
    });
  } catch (error) {
    res.status(500).json({ msg: "Server erreur", err: error.message });
  }
});

module.exports = router;
