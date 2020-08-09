const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateLoginInputs,
  validateRegisterInputs,
} = require("../validation/auth");

const Player = require("../models/Player");

// Register
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const exist = await Player.findOne({ email: req.body.email });

  if (exist) {
    return res.status(400).json({ error: "Email already exist" });
  }

  const newPlayer = new Player({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    wins: 0,
    losses: 0,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json({ error: "Internal server error" });

    bcrypt.hash(newPlayer.password, salt, (err, hash) => {
      if (err) return res.status(500).json({ error: "Internal server error" });
      newPlayer.password = hash;
      newPlayer
        .save()
        .then((player) => res.json(player))
        .catch((err) => res.status(500).json({ err }));
    });
  });
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  Player.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "Player not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const payload = {
          id: user.id,
          fullName: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar,
        };

        jwt.sign(payload, process.env.SECRET_OR_KEY, (err, token) => {
          if (err) return res.status(500).json(err);
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
