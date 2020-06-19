const jwt = require('jsonwebtoken')
const secretKey = 'react-mongoose'

module.exports = {
  authentication: (req, res, next) => {
    try {
      const { access_token } = req.headers

      jwt.verify(access_token, secretKey, (err, decoded) => {
        if(!err) {
          req.userData = decoded
          console.log(req.userData)
          next()
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })

    } catch (error) {
      res.status(404).json({ message: "user not found" });
    }
  }
}
