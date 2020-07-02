const jwt = require("jsonwebtoken");
const secretKey = "akulagimakan";

module.exports = {
  authentication: (req, res, next) => {
    try {
      const { access_token } = req.headers;
      const decoded = jwt.verify(access_token, secretKey);
      
      if (decoded) {
        req.userData = decoded;
        console.log(req.headers, "role")
        console.log(req.headers.role, "role")
        next();
      } else {
        res.json({ ok: false, message: "User unauthenticated" });
      }
    } catch (error) {
      console.log(error)
      res.json({ ok: true, message: "Oops! Something went wrong", error });
    }
  },
  authorization: (req, res, next) => {
    if (req.headers.role === 'admin') {
      next()
    } else {
      next('you have no permission')
    }
  },
};
