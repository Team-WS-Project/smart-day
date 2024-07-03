const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

dotenv.config();

const ensureAuthorization = (req, res, next) => {
  try {
    let receivedJwt = req.headers["authorization"];

    if (!receivedJwt) {
      throw new ReferenceError("jwt must be provided");
    }

    let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    req.authorization = decodedJwt; // 요청 객체에 디코딩된 정보 저장
    next(); // 다음 미들웨어 호출
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요.",
      });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "잘못된 토큰입니다.",
        error: err.message, // 추가적인 에러 메시지 반환
      });
    } else {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "서버 오류입니다. 다시 시도해 주세요.",
      });
    }
  }
};

module.exports = ensureAuthorization;
