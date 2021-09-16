const { Router } = require("express");
const trackController = require("../controllers/track.controller");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.get("/", authenticate, trackController.GetTracks);
router.post("/", authenticate, trackController.CreateTrack);

module.exports = router;
