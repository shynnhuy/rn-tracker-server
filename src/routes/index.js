const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth.route"));
router.use("/tracks", require("./track.route"));

module.exports = router;
