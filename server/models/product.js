const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  image_url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
}, {
  timestamps: true
})

const product = mongoose.model('Product', productSchema)

module.exports = product
