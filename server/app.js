require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const nodemailer = require('nodemailer')

const router = require('./routers')

mongoose.connect(`mongodb+srv://abc:b5spUX11IrxupeoP@cluster0-x3z5l.mongodb.net/ecommerce?retryWrites=true&w=majority`, 
{
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useCreateIndex: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //we're connected!
  console.log('Hallo Moongose')
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.listen(port, () => {
  console.log(`listen on port ${port}`)
})