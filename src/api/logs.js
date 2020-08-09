const { Router } = require("express");
const passport = require("passport");
const router = new Router();

const ActionLog = require("../models/ActionLog");

router.get(
  "/:playerId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { playerId } = req.params;

    if (!playerId) {
      return res.status(404).json({ error: "Unknown player" });
    }

    ActionLog.find({ playerId })
      .then((logs) => res.json(logs))
      .catch((err) => res.status(400).json(err));
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const log = new ActionLog({
      playerId: req.body.playerId,
      logs: req.body.logs,
      status: req.body.status,
    });

    log
      .save()
      .then((log) => res.json(log))
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
