const dotenv = require("dotenv");
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");

dotenv.config();

const getFavorites = (req, res) => {
  ensureAuthorization(req, res, () => {
    const user_id = req.authorization.id;

    const getFavoritesSql = `SELECT location_name FROM favorites WHERE user_id = ?`;
    conn.query(getFavoritesSql, [user_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  });
};

const addFavorite = (req, res) => {
  ensureAuthorization(req, res, () => {
    const { location_name } = req.body;
    const user_id = req.authorization.id;

    const checkFavoriteSql = `SELECT user_id FROM favorites WHERE user_id = ? AND location_name = ?`;
    const values = [user_id, location_name];

    conn.query(checkFavoriteSql, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length > 0) {
        // 이미 즐겨찾기된 위치인지 확인
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "이미 즐겨찾기된 항목입니다." });
      }

      const addFavoriteSql = `INSERT INTO favorites (user_id, location_name) VALUES (?, ?)`;

      conn.query(addFavoriteSql, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res
          .status(StatusCodes.CREATED)
          .json({ message: "즐겨찾기 추가 완료" });
      });
    });
  });
};

const deleteFavorite = (req, res) => {
  ensureAuthorization(req, res, () => {
    const { location_name } = req.body;
    const user_id = req.authorization.id;

    const deleteFavoriteSql = `DELETE FROM favorites WHERE user_id = ? AND location_name = ?`;
    conn.query(deleteFavoriteSql, [user_id, location_name], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.affectedRows === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "즐겨찾기 항목을 찾을 수 없습니다." });
      }

      return res.status(StatusCodes.OK).json({ message: "즐겨찾기 삭제 완료" });
    });
  });
};

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
