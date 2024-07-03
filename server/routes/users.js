const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const {
  join,
  login,
  userInformation,
  infoToUpdate,
  updateUserInformation,
} = require("../controller/usersControlloer");

router.use(express.json());

router.post("/join", join); // 회원가입
router.post("/login", login); // 로그인
router.get("", userInformation); // 메인페이지 location, nickname 조회
router.get("/update", infoToUpdate); // 회원 정보 수정창 email, nickname, location 조회
router.put("/update", updateUserInformation); // 회원 정보 수정

module.exports = router;
