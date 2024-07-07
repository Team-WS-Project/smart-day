const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

//일정 조회
const getAllSchedules = (req, res) => {
  const { start, end, date, month } = req.query;

  let values = [];
  let sql = "SELECT * FROM SmartDay.schedules";

  if (start && end) {
    sql += " WHERE date BETWEEN ? AND ?";
    values = [start, end];
  } else if (date) {
    sql += " WHERE date = ?";
    values = [date];
  } else if (month) {
    sql += " WHERE DATE_FORMAT(date, '%Y-%m') = ?";
    values = [month];
  }

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

// 개별 일정 조회
const getScheduleById = (req, res) => {
  const { id } = req.params;

  let sql = `
    SELECT title, date, start_time, end_time, detail, completed
	  FROM schedules
	  WHERE id = ?
    `;
  let values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (results.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "해당 일정을 조회할 수 없습니다." });
    }

    res.status(StatusCodes.OK).json(results[0]);
  });
};

// 개별 일정 추가
const addSchedule = (req, res) => {
  const { title, date, startTime, endTime } = req.body;
  let sql =
    "INSERT INTO schedules (title, date, start_time, end_time) VALUES (?, ?, ?, ?)";
  let values = [title, date, startTime, endTime];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    res.status(StatusCodes.CREATED).json(results);
  });
};

// 개별 일정 수정
const updateSchedule = (req, res) => {
  const { id } = req.params;
  const { title, date, startTime, endTime, detail, completed } = req.body;

  let sql = `
        UPDATE schedules
        SET title = ?, date = ?, start_time = ?, end_time = ?, detail = ?, completed = ?
        WHERE id = ?
      `;
  let values = [title, date, startTime, endTime, detail, completed, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    res.status(StatusCodes.OK).json(results);
  });
};

// 개별 일정 삭제
const deleteSchedule = (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM schedules WHERE id = ?";

  conn.query(sql, id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "해당 일정을 조회할 수 없습니다." });
    }

    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};
