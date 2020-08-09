const mongoose = require("mongoose");
const { Schema } = mongoose;

const Player = new Schema({
  firstName: String,
  lastName: String,
  name: String,
  email: String,
  password: String,
  avatar: String,
  wins: Number,
  losses: Number,
});

module.exports = mongoose.model("players", Player);
