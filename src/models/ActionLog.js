const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActionLog = new Schema(
  {
    playerId: String,
    logs: [],
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("actionLogs", ActionLog);
