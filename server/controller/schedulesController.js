const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getScheduleByPeriod = (start, end) => {
  return {
    sql: `
     SELECT start_date, GROUP_CONCAT(title ORDER BY title ASC SEPARATOR ', ') AS titles
      FROM schedules
      WHERE start_date BETWEEN ? AND ?
      GROUP BY start_date
      ORDER BY start_date ASC
    `,
    value: [start, end],
  };
};

const getScheduleByMonth = (month) => {
  return {
    sql: `
    SELECT id, user_id, title, detail, start_date, end_date, start_time, end_time, completed 
    FROM schedules 
    WHERE DATE_FORMAT(start_date, '%Y-%m') = ?
    `,
    value: [month],
  };
};

const getScheduleByDate = (date) => {
  return {
    sql: `
    SELECT id, user_id, title, detail, start_date, end_date, start_time, end_time, completed 
    FROM schedules 
    WHERE start_date = ?`,
    value: [date],
  };
};

const getSchedulesQuery = ({ start, end, date, month }) => {
  if (start && end) {
    return getScheduleByPeriod(start, end);
  }
  if (month) {
    return getScheduleByMonth(month);
  }
  if (date) {
    return getScheduleByDate(date);
  }

  return {
    sql: `SELECT id, user_id, title, detail, start_time, end_time, start_date 
    FROM schedules`,
    value: [],
  };
};

const getSchedules = async (req, res) => {
  const { start, end, date, month } = req.query;

  if (start && end) {
    try {
      const scheduleTitles = await getScheduleTitles(start, end);
      return res.status(StatusCodes.OK).json(scheduleTitles);
    } catch (err) {
      console.err(err);
      return res.status(StatusCodes.INTERNAL_SERVER_err).end();
    }
  }

  const query = getSchedulesQuery({ start, end, date, month });

  const { sql, value: values } = query;

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.err(err);
      return res.status(StatusCodes.INTERNAL_SERVER_err).end();
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
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.err(err);
      return res.status(StatusCodes.INTERNAL_SERVER_err).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).end();
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
      console.err(err);
      return res.status(StatusCodes.INTERNAL_SERVER_err).end();
    }

    res.status(StatusCodes.CREATED).json({
      message: "새 일정 추가 완료 -> 메인 페이지로 이동",
    });
  });
};

const updateSchedule = (req, res) => {
  const { id } = req.params;
  const { title, detail, startDate, endDate, startTime, endTime } = req.body;

  const sql = `
    UPDATE schedules
    SET title = ?, detail = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?
    WHERE id = ?
  `;

  const values = [title, detail, startDate, endDate, startTime, endTime, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.err(err);
      return res.status(StatusCodes.INTERNAL_SERVER_err).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const deleteSchedule = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM schedules WHERE id = ?";

  conn.query(sql, id, (err, results) => {
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.err(err);
      return res.status(StatusCodes.INTERNAL_SERVER_err).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  getSchedules,
  getMonthlyArray,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
