const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  totalPrice: Number,
  items :[
    {
      product : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
      },
      quantity: Number
    }
  ]
}, {
  timestamps: true
})

const chart = mongoose.model('Chart', chartSchema)

module.exports = chart