const { BadRequest } = require("http-errors");
const { Track } = require("../models/track.model");

module.exports = {
  GetTracks: async (req, res, next) => {
    try {
      const tracks = await Track.find({ userId: req.user._id });
      res.send(tracks);
    } catch (error) {
      next(error);
    }
  },
  CreateTrack: async (req, res, next) => {
    try {
      const { name, locations } = req.body;
      if (!name || !locations) {
        throw BadRequest("You must provide a name and locations");
      }

      const track = new Track({ name, locations, userId: req.user._id });
      const savedTrack = await track.save();
      res.send({ success: true, message: "Track created", result: savedTrack });
    } catch (error) {
      next(error);
    }
  },
};
