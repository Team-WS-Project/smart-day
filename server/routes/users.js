const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { join, login, emailToUpdate, updateUserInformation, mainPage } = require('../controller/UserControlloer');

router.use(express.json());

router.post('/join', join); // 회원가입
router.post('/login', login); // 로그인
router.get('/update', emailToUpdate); // 회원 정보 수정 email 조회
router.put('/update', updateUserInformation); // 회원 정보 수정
router.get('', mainPage); // 메인페이지 location, nickname 조회

module.exports = router