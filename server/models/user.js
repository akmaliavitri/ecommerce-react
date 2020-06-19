const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (errSalt, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        next(err);
      } else {
        this.password = hash;
        next();
      }
    });
  });

  this.model('Chart')
  .create({
    user : this._id
  }, next)

});

const user = mongoose.model("User", userSchema);

module.exports = user;
