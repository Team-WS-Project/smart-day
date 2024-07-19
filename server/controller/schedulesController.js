const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");

const getScheduleByPeriod = (id, start, end) => {
  return {
    sql: `
    SELECT user_id, start_date, GROUP_CONCAT(title ORDER BY title ASC SEPARATOR ', ') AS titles
    FROM schedules
    WHERE user_id = ?
    AND start_date BETWEEN ? AND ?
    GROUP BY start_date
    ORDER BY start_date ASC
    `,
    values: [id, start, end],
  };
};

const getScheduleByMonth = (id, month) => {
  return {
    sql: `
    SELECT user_id, id, title, detail, start_date, end_date, start_time, end_time, completed 
    FROM schedules 
    WHERE user_id = ?
    AND DATE_FORMAT(start_date, '%Y-%m') = ?
    `,
    values: [id, month],
  };
};

const getScheduleByDate = (id, date) => {
  return {
    sql: `
    SELECT user_id, id, title, detail, start_date, end_date, start_time, end_time, completed 
    FROM schedules 
    WHERE user_id = ?
    AND start_date = ?
    `,
    values: [id, date],
  };
};

const getSchedulesQuery = ({ id, start, end, date, month }) => {
  if (id && start && end) {
    return getScheduleByPeriod(id, start, end);
  }
  if (id && month) {
    return getScheduleByMonth(id, month);
  }
  if (id && date) {
    return getScheduleByDate(id, date);
  }

  return {
    sql: `SELECT id, user_id, title, detail, start_time, end_time, start_date 
    FROM schedules
    WHERE user_id = ?
    `,
    values: [id],
  };
};

const getSchedules = async (req, res) => {
  const { start, end, date, month } = req.query;

  ensureAuthorization(req, res, async () => {
    const id = req.authorization.id;
    if (id && start && end) {
      try {
        const scheduleTitles = await getScheduleTitles(id, start, end);
        return res.status(StatusCodes.OK).json(scheduleTitles);
      } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      }
    }

    const query = getSchedulesQuery({ id, start, end, date, month });

    const { sql, values } = query;

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  });
};

const getScheduleTitles = async (id, startDate, endDate) => {
  try {
    const { sql, values } = getScheduleByPeriod(id, startDate, endDate);
    console.log("Executing query:", sql);
    console.log("With values:", values);

    const results = await new Promise((resolve, reject) => {
      conn.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    const formattedResults = results.map((schedule) => ({
      start_date: new Date(schedule.start_date).toISOString().split("T")[0],
      titles: schedule.titles.split(", "),
    }));

    return formattedResults;
  } catch (err) {
    console.error(err);
    throw err;
  }
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

  ensureAuthorization(req, res, async () => {
    try {
      const scheduleArray = await createScheduleArray(year, month);
      res.status(StatusCodes.OK).json({ monthArray: scheduleArray });
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  });
};

const getScheduleById = (req, res) => {
  const { id } = req.params;
  ensureAuthorization(req, res, () => {
    const sql = `
      SELECT title, detail, start_date, end_date, start_time, end_time, completed
      FROM schedules
      WHERE id = ?
      `;

    conn.query(sql, id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      }

      if (results.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).end();
      }

      res.status(StatusCodes.OK).json(results[0]);
    });
  });
};

const createSchedule = (req, res) => {
  ensureAuthorization(req, res, () => {
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
  });
};

const updateSchedule = (req, res) => {
  ensureAuthorization(req, res, () => {
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
  });
};

const deleteSchedule = (req, res) => {
  ensureAuthorization(req, res, () => {
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
