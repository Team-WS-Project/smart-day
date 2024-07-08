const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getScheduleByPeriod = ({ start, end }) => [
  "SELECT * FROM SmartDay.schedules WHERE date BETWEEN ? AND ?",
  [start, end],
];

const getScheduleByMonth = (month) => [
  "SELECT * FROM SmartDay.schedules WHERE DATE_FORMAT(date, '%Y-%m') = ?",
  [month],
];

const getScheduleByDate = (date) => ["SELECT * FROM SmartDay.schedules WHERE date = ?", [date]];

const getSchedulesQuery = ({ start, end, date, month }) => {
  if (start && end) return getScheduleByPeriod({ start, end });
  if (month) return getScheduleByMonth(month);
  if (date) return getScheduleByDate(date);

  return ["SELECT * FROM SmartDay.schedules", []];
};

const getAllSchedules = (req, res) => {
  const { start, end, date, month } = req.query;
  const [sql, values] = getSchedulesQuery({ start, end, date, month });

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

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
      return res.status(StatusCodes.NOT_FOUND).json({ message: "해당 일정을 조회할 수 없습니다." });
    }

    res.status(StatusCodes.OK).json(results[0]);
  });
};

const addSchedule = (req, res) => {
  const { title, date, startTime, endTime } = req.body;
  let sql = "INSERT INTO schedules (title, date, start_time, end_time) VALUES (?, ?, ?, ?)";
  let values = [title, date, startTime, endTime];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    return res.status(StatusCodes.CREATED).json(results);
  });
};

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

    return res.status(StatusCodes.OK).json(results);
  });
};

const deleteSchedule = (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM schedules WHERE id = ?";

  conn.query(sql, id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "해당 일정을 조회할 수 없습니다." });
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};
