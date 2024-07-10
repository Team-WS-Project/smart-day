const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getScheduleByPeriod = (start, end) => {
  return {
    sql: `
    SELECT user_id, id, title, start_date, end_date, start_time, end_time, completed
    FROM schedules 
    WHERE start_date BETWEEN ? AND ?
    `,
    value: [start, end],
  };
};

const getScheduleByMonth = (month) => {
  return {
    sql: "SELECT * FROM schedules WHERE DATE_FORMAT(date, '%Y-%m') = ?",
    value: [month],
  };
};

const getScheduleByDate = (date) => {
  return {
    sql: "SELECT * FROM schedules WHERE start_date = ?",
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

const getSchedules = (req, res) => {
  const { start, end, date, month } = req.query;
  const query = getSchedulesQuery({ start, end, date, month });

  const { sql, value: values } = query;

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const createScheduleArray = (year, month) => {
  return new Promise((resolve, reject) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthArray = new Array(daysInMonth).fill(false);

    const sql = `
      SELECT start_date, end_date 
      FROM schedules 
      WHERE YEAR(start_date) = ? AND MONTH(start_date) = ?
    `;
    const values = [year, month];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      results.forEach((schedule) => {
        const start = new Date(schedule.start_date);
        const end = new Date(schedule.end_date);

        for (let d = start.getUTCDate(); d <= end.getUTCDate(); d++) {
          monthArray[d - 1] = true;
        }
      });

      resolve(monthArray);
    });
  });
};

const getMonthlyArray = async (req, res) => {
  const { year, month } = req.query;

  try {
    const scheduleArray = await createScheduleArray(year, month);
    res.status(StatusCodes.OK).json({ monthArray: scheduleArray });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

const getScheduleById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT title, start_date, start_time, end_time, detail, completed
	  FROM schedules
	  WHERE id = ?
    `;
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "" });
    }

    res.status(StatusCodes.OK).json(results[0]);
  });
};

const createSchedule = (req, res) => {
  const { title, date, startTime, endTime } = req.body;
  const sql = "INSERT INTO schedules (title, start_date, start_time, end_time) VALUES (?, ?, ?, ?)";
  const values = [title, date, startTime, endTime];

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

  const sql = `
        UPDATE schedules
        SET title = ?, start_date = ?, start_time = ?, end_time = ?, detail = ?, completed = ?
        WHERE id = ?
      `;
  const values = [title, date, startTime, endTime, detail, completed, id];

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
  const sql = "DELETE FROM schedules WHERE id = ?";

  conn.query(sql, id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "" });
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
