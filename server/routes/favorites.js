const express = require("express");
const router = express.Router();
const {
  addFavorite,
  deleteFavorite,
  getFavorites,
} = require("../controller/favoritesController");

router.use(express.json());

router.get("/", getFavorites); // 유저별 즐겨찾기 조회
router.post("/add", addFavorite); // 즐겨찾기 추가
router.delete("/delete", deleteFavorite); // 즐겨찾기 삭제

module.exports = router;
