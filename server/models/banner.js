const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bannerSchema = new Schema({
  img_banner : String
})

const banner = mongoose.model('Banner', bannerSchema)

module.exports = banner