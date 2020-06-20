const jwt = require("jsonwebtoken");
const secretKey = "akulagimakan";

module.exports = {
  authentication: (req, res, next) => {
    try {
      const { access_token } = req.headers;
      const decoded = jwt.verify(access_token, secretKey);
      if (decoded) {
        req.userData = decoded;
        console.log(req.userData);
        next();
      } else {
        console.log(error);
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      // console.log(error)
      res.status(404).json({ message: "server error", error });
    }
    // const { access_token } = req.headers

    // if(access_token) {
    //   const decoded = jwt.verify(access_token, secretKey)
    //   req.userData = decoded
    //   console.log("decoded:",decoded.email)
    //   next()
    // } else {
    //   next()
    // }
  },
};
