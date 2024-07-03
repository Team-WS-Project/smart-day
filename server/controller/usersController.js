const dotenv = require("dotenv");
dotenv.config();
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ensureAuthorization = require("../auth");

// 메인페이지 location, nickname 조회
const getUserInformation = (req, res) => {
  let authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요.",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰입니다.",
    });
  } else {
    const sql = `SELECT location, nickname FROM users WHERE email = ?`;

    conn.query(sql, authorization.email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results[0]);
    });
  }
};

// 회원 정보 수정창 email, nickname, location 조회
const getInfoToUpdate = (req, res) => {
  let authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요.",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰입니다.",
    });
  } else {
    const sql = `SELECT email, nickname, location FROM users WHERE email = ?`;

    conn.query(sql, authorization.email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length > 0) {
        return res.status(StatusCodes.OK).json(results[0]);
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }
    });
  }
};

const join = (req, res) => {
  const { email, password, location, nickname } = req.body;

  const sql = `INSERT INTO users (email, password, salt, location, nickname) VALUES (?, ?, ?, ?, ?)`;

  const salt = crypto.randomBytes(16).toString("base64");
  const hashPassword = hashing(password, salt);

  const values = [email, hashPassword, salt, location, nickname];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows) {
      return res.status(StatusCodes.CREATED).json(results);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const loginUser = results[0];

    // salt값 꺼내서 날 것으로 들어온 비밀번호 암호화
    const hashPassword = hashing(password, loginUser.salt);

    // 위에서 암호화된 비밀번호 db 비밀번호랑 비교
    if (loginUser && loginUser.password == hashPassword) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRED_TIME,
          issuer: "SmartDay",
        },
      );
      // 토큰 쿠키에 담기
      res.cookie("token", token, {
        httpOnly: true,
      });
      console.log(token);

      return res.status(StatusCodes.CREATED).json(results);
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: "아이디 또는 비밀번호를 잘못 입력했습니다.",
        })
        .end();
    }
  });
};

// 회원 정보 수정
const updateUserInformation = (req, res) => {
  let { location, nickname } = req.body;

  let authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요.",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰입니다.",
    });
  } else {
    let sql = `UPDATE users SET location=?, nickname=? WHERE email=?`;

    let values = [location, nickname, authorization.email];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  }
};

const hashing = (password, salt) => {
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");
  return hashPassword;
};

module.exports = {
  getUserInformation,
  getInfoToUpdate,
  join,
  login,
  updateUserInformation,
};
