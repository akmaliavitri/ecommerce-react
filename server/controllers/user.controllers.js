const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Chart = require("../models/chart");

const statusMessage = require("../helpers/status.message");

const secretKey = "akulagimakan";

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
      let { email, password } = req.body;
      const user = await User.findOne({
        email,
      });

      if (user) {
        const hashed = bcrypt.compare(user.password, password);
       
        if (hashed) {
          const token = jwt.sign(
            {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role
            },
            secretKey
          );

          const payload = {
            id: user._id,
            token,
          };
          
          statusMessage(res, true, 'success sign in', payload)
        } else {
          statusMessage(res, false, "wrong email / password", null);
        }
      } else {
        console.log('disini')
        statusMessage(res, false, "wrong email / password", null);
      }
    } catch (error) {
      statusMessage(res, false, "something went wrong", null);
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.userData;

      const user = await Chart.findOne({ user: id }).populate("user");

      statusMessage(res, true, "success read user", user);
    } catch (error) {
      console.log(error);
      statusMessage(res, false, "something went wrong", null);
    }
  },
};
