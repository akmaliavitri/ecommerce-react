const Banner = require("../models/banner");
const statusMessage = require("../helpers/status.message");

module.exports = {
  addBanner: async (req, res) => {
    try {
      const banner = await Banner.create({ img_banner: req.body.img_banner });

      statusMessage(res, true, "success", banner);

    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  findBanner: async (req, res) => {
    try {
      const banner = await Banner.find({});
      statusMessage(res, true, "success", banner);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  deleteBanner: async (req, res) => {
    try {
      const { id } = req.params;

      const banner = await Banner.findByIdAndRemove({ _id: id });
      statusMessage(res, true, "success", banner);
      
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },
};
