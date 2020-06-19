const User = require("../models/user");
const statusMessage = require("../helpers/status.message");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = 'akulagimakan'

module.exports = {
  signUp: async (req, res) => {
    try {
      const user = await User.create(req.body);

      statusMessage(res, true, "success sign up", user);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  signIn: async (req, res) => {
    try {
      let { email, password } = req.body

      const user = await User.findOne({
        email
      })
      console.log(user, "user>>>>")
      if(user) {
        bcrypt.compare(user.password, password, (err, isMatch) => {
          if(!err) {

            const token = jwt.sign({
              id: user._id,
              username: user.username,
              email: user.email
            }, secretKey)

            const payload = {token}
            return res.status(200).json({message: 'sucess', token: token, id: user._id})


          } else {
            statusMessage(res, false, 'wrong email / password', null);
          }
        })
      } else {
        console.log(">>>>")
        statusMessage(res, false, 'wrong email / password', null);
      }
    } catch (error) {
      statusMessage(res, false, 'wrong email / password', null);
    }
  }

};
