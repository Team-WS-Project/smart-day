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

// const getSchedules = (req, res) => {
//   const { start, end, date, month } = req.query;
//   const query = getSchedulesQuery({ start, end, date, month });

//   const { sql, value: values } = query;

//   conn.query(sql, values, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
//     }

//     return res.status(StatusCodes.OK).json(results);
//   });
// };

const getSchedules = async (req, res) => {
  const { start, end, date, month } = req.query;

  if (start && end) {
    try {
      const scheduleTitles = await getScheduleTitlesByDateRange(start, end);
      return res.status(StatusCodes.OK).json(scheduleTitles);
    } catch (error) {
      console.error("Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
  }

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

const getScheduleTitlesByDateRange = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const { sql, value: values } = getScheduleByPeriod(startDate, endDate);
    console.log("Executing query:", sql);
    console.log("With values:", values);

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        reject(err);
        return;
      }

      const formattedResults = results.map((schedule) => ({
        start_date: new Date(schedule.start_date).toISOString().split("T")[0],
        titles: schedule.titles.split(", "),
      }));

      resolve(formattedResults);
    });
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
    SELECT title, detail, start_date, end_date, start_time, end_time, completed
	  FROM schedules
	  WHERE id = ?
    `;
  const values = [id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }

    res.status(StatusCodes.OK).json(results[0]);
  });
};

const createSchedule = (req, res) => {
  const { title, detail, startDate, endDate, startTime, endTime } = req.body;
  const sql =
    "INSERT INTO schedules (title, detail, start_date, end_date, start_time, end_time) VALUES (?, ?, ?, ?,?,?)";
  const values = [title, detail, startDate, endDate, startTime, endTime];

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
  const { title, detail, startDate, endDate, startTime, endTime } = req.body;

  const sql = `
    UPDATE schedules
    SET title = ?, detail = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?
    WHERE id = ?
  `;

  const values = [title, detail, startDate, endDate, startTime, endTime, id];

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
