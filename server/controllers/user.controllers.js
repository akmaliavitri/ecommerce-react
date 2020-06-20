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

      if(user) {
        bcrypt.compare(user.password, password, (err, isMatch) => {
          if(!err) {

            const generateToken = jwt.sign({
              id: user._id,
              username: user.username,
              email: user.email
            }, secretKey)

            const payload = {generateToken, user}
            //return res.status(200).json({message: 'sucess',payload, id: user._id})
            statusMessage(res, true, 'success sign in', payload)

          } else {
            statusMessage(res, false, 'wrong email / password', null);
          }
        })
      } else {

        statusMessage(res, false, 'wrong email / password', null);
      }
    } catch (error) {
      statusMessage(res, false, 'wrong email / password', null);
    }
  }

};
