const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getAllSchedules = (req, res) => {
  const { start, end } = req.query;
  let values = [];
  let sql = "SELECT * FROM SmartDay.schedules";

  if (start && end) {
    sql += " WHERE date BETWEEN ? AND ?";
    values = [start, end];
  }

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

// 날짜별 일정 조회 
///ex. schedules/date/2024-06-01
const getSchedulesByDate = (req, res) => {
  const { date } = req.params;
  let sql = "SELECT * FROM schedules WHERE date = ?";
  let values = [date];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (results.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "해당 날짜의 일정이 없습니다." });
    }

    res.status(StatusCodes.OK).json(results);
  });
};

//개별 일정 조회
const getScheduleById = (req, res) => {
  const { id } = req.params;
  let sql = `
      SELECT date, start_time, end_time, title, detail, completed
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
    "INSERT INTO schedules (Title, date, start_time, end_time) VALUES(?, ?, ?, ?)";
  let values = [title, date, startTime, endTime];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    res.status(StatusCodes.CREATED).json(results);
  });
};

//개별 일정 수정
const updateSchedule = (req, res) => {
  const { id } = req.params;
  const { title, date, startTime, endTime, Detail, completed } = req.body;

  let sql = `
        UPDATE schedules
        SET title = ?, date = ?, start_time = ?, end_time = ?, detail = ?, completed = ?
        WHERE id = ?
      `;
  let values = [title, date, startTime, endTime, Detail, completed, id];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    res.status(StatusCodes.OK).json({
      message: "일정 수정 놘료",
    });
  });
};

//개별 일정 삭제
const deleteSchedule = (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM schedules WHERE id = ?";

  conn.query(sql, id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "일정을 찾을 수 없습니다." });
    }

    res.status(StatusCodes.OK).json({ message: "일정 삭제 완료" });
  });
};

module.exports = {
  getAllSchedules,
  getSchedulesByDate,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};
