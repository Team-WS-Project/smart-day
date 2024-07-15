const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const {
  getUser,
  join,
  login,
  updateUserInformation,
} = require("../controller/usersController");

router.use(express.json());

// router.get("/", getUser); // 메인페이지 location, nickname 조회
router.get("/", getUser); // 회원 정보 수정창 email, nickname, location 조회, 메인페이지 location, nickname 조회
router.post("/join", join);
router.post("/login", login);
router.put("/update", updateUserInformation); // 회원 정보 수정

module.exports = router;
