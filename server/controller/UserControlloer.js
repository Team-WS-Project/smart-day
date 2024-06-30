const dotenv = require('dotenv');
dotenv.config();
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ensureAuthorization = require('../auth');


const join = (req, res) => {
    const { email, password, location, nickname } = req.body;

    let sql = `INSERT INTO users (email, password, location, nickname, salt) VALUES (?, ?, ?, ?, ?)`;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let values = [email, hashPassword, location, nickname, salt];
    conn.query(sql, values,
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            
            if(results.affectedRows)
                return res.status(StatusCodes.CREATED).json(results);
            else
                return res.status(StatusCodes.BAD_REQUEST).end();
        }
    )
}

const login = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, 
        (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const loginUser = results[0];

            // salt값 꺼내서 날 것으로 들어온 비밀번호 암호화 해보고 
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

            // => db 비밀번호랑 비교
            if(loginUser && loginUser.password == hashPassword) {
                const token = jwt.sign({
                    id : loginUser.id,
                    email : loginUser.email,
                    location : loginUser.location,
                    nickname : loginUser.nickname
                }, process.env.PRIVATE_KEY, {
                    expiresIn : "1h",
                    issuer : "User"
                });
                // 토큰 쿠키에 담기
                res.cookie("token", token, {
                    httpOnly : true
                });
                console.log(token);

                return res.status(StatusCodes.CREATED).json(results);
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    "message" : "아이디 또는 비밀번호를 잘못 입력했습니다."
                }).end(); // 401 : Unauthorized (비인증), 403 : Forbidden (접근 권리 없음)
            }
        }
    )
}

const emailToUpdate = (req, res) => {// 회원 정보 수정 email 조회
    // const { email } = req.body;

    let authorization = ensureAuthorization(req, res);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    } else {
        let sql = `SELECT * FROM users WHERE email = ?`;
        conn.query(sql, authorization.email, 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.OK).json(authorization.email);
            }
        )
    }
}

const updateUserInformation = (req, res) => {// 회원 정보 수정
    let { password, location, nickname } = req.body;
    
    let authorization = ensureAuthorization(req, res);
    
    location = location ?? authorization.location;
    nickname = nickname ?? authorization.nickname;

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    } else {
        let sql = `UPDATE users SET password=?, salt=?, location=?, nickname=? WHERE email=?`;

        const salt = crypto.randomBytes(10).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
    
        let values = [hashPassword, salt, location, nickname, authorization.email];
        conn.query(sql, values, 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.OK).json(results);
            }
        )
    }
}

const mainPage = (req, res) => {// 메인페이지 location, nickname 조회
    let authorization = ensureAuthorization(req, res);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    } else {
        let sql = `SELECT location, nickname FROM users WHERE email = ?`;
    
        conn.query(sql, authorization.email, 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.OK).json(results[0]);
            }
        )
    }
}

module.exports = {
    join,
    login,
    emailToUpdate,
    updateUserInformation,
    mainPage
}