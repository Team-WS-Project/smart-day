const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const ensureAuthorization = (req, res) => {
  try {
    let receivedJwt = req.headers["authorization"];

    if (receivedJwt) {
      let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
      return decodedJwt;
    } else {
      throw new ReferenceError("jwt must be provided");
    }
  } catch (err) {
    return err;
  }
};

module.exports = ensureAuthorization;
