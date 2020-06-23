require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const nodemailer = require("nodemailer");

mongoose.connect(
  `mongodb+srv://abc:b5spUX11IrxupeoP@cluster0-x3z5l.mongodb.net/ecommerce?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Hallo Moongose");
});

const router = require("./routers");
// const connection = mongoose.connection;
// connection
//   .once("open", () => {
//     console.log("mongoDB database connection established");
//   })
//   .on("error", (err) => {
//     console.log("Error: ", err);
//   });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
