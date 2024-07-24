const express = require("express");
const router = express.Router();
const {
  getUser,
  join,
  login,
  updateUserInformation,
  logout,
  verifyPassword,
} = require("../controller/usersController");

router.use(express.json());

router.get("/", getUser); // 회원 정보 수정창 email, nickname, location 조회, 메인페이지 location, nickname 조회
router.post("/join", join);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyPassword", verifyPassword);
router.put("/update", updateUserInformation); // 회원 정보 수정

module.exports = router;
