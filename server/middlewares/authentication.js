const jwt = require("jsonwebtoken");
const secretKey = "akulagimakan";

module.exports = {
  authentication: (req, res, next) => {
    try {
      const { access_token } = req.headers;

      const decoded = jwt.verify(access_token, secretKey);

      if (decoded) {
        req.userData = decoded;

        next();
      } else {
        res.json({ ok: false, message: "User unauthenticated" });
      }
    } catch (error) {
      res.json({ ok: true, message: "Oops! Something went wrong", error });
    }
  },
};
