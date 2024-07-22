const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");

const getSchedulesByFourDays = async (req, res) => {
  ensureAuthorization(req, res, async () => {
    const userId = req.authorization.id;
    const today = new Date();
    const daysToAdd = 4;

    const formatDate = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const endDate = addDays(today, daysToAdd - 1);

    const sql = `
      SELECT id, start_date, start_time, end_time, title, detail 
      FROM schedules 
      WHERE user_id = ? 
      AND start_date BETWEEN ? AND ?
    `;

    const values = [userId, formatDate(today), formatDate(endDate)];

    try {
      const results = await new Promise((resolve, reject) => {
        conn.query(sql, values, (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      });

      const tasks = results.map((result) => ({
        date: new Date(result.start_date).toISOString().split("T")[0],
        startTime: result.start_time,
        endTime: result.end_time,
        title: result.title,
        description: result.detail,
      }));

      return res.status(StatusCodes.OK).json(tasks);
    } catch (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  });
};

const getScheduleByPeriod = (id, start, end) => ({
  sql: `
    SELECT user_id, start_date, GROUP_CONCAT(title ORDER BY title ASC SEPARATOR ', ') AS titles
    FROM schedules
    WHERE user_id = ?
    AND start_date BETWEEN ? AND ?
    GROUP BY start_date
    ORDER BY start_date ASC
  `,
  values: [id, start, end],
});

const getScheduleByMonth = (id, month) => ({
  sql: `
    SELECT user_id, start_date, end_date
    FROM schedules 
    WHERE user_id = ?
    AND DATE_FORMAT(start_date, '%Y-%m') = ?
  `,
  values: [id, month],
});

const getScheduleByDate = (id, date) => ({
  sql: `
    SELECT user_id, id, title, detail, start_date, end_date, start_time, end_time 
    FROM schedules 
    WHERE user_id = ?
    AND start_date = ?
  `,
  values: [id, date],
});

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
    sql: `
      SELECT id, user_id, title, detail, start_time, end_time, start_date, end_date
      FROM schedules
      WHERE user_id = ?
    `,
    values: [id],
  };
};

const getSchedules = async (req, res) => {
  ensureAuthorization(req, res, async () => {
    const id = req.authorization.id;
    const { start, end, date, month } = req.query;

    if (id) {
      const query = getSchedulesQuery({ id, start, end, date, month });
      const { sql, values } = query;

      try {
        const results = await new Promise((resolve, reject) => {
          conn.query(sql, values, (err, results) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(results);
          });
        });

        if (start && end) {
          const scheduleTitles = await getScheduleTitles(id, start, end);
          return res.status(StatusCodes.OK).json(scheduleTitles);
        }

        return res.status(StatusCodes.OK).json(results);
      } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      }
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const getScheduleTitles = async (id, startDate, endDate) => {
  try {
    const { sql, values } = getScheduleByPeriod(id, startDate, endDate);

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

const createScheduleArray = (year, month, userId) => {
  return new Promise((resolve, reject) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthArray = new Array(daysInMonth).fill(false);
    const sql = `
      SELECT start_date, end_date 
      FROM schedules 
      WHERE YEAR(start_date) = ? AND MONTH(start_date) = ? AND user_id = ?
    `;
    const values = [year, month, userId];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error("SQL Query Error:", err);
        reject(err);
        return;
      }

      results.forEach((schedule) => {
        const start = new Date(schedule.start_date);
        const end = new Date(schedule.end_date);

        for (let d = start.getUTCDate(); d <= end.getUTCDate(); d++) {
          if (start.getMonth() + 1 === month) {
            monthArray[d - 1] = true;
          }
        }
      });

      resolve(monthArray);
    });
  });
};

const getMonthlyArray = async (req, res) => {
  ensureAuthorization(req, res, async () => {
    const { year, month } = req.query;
    const userId = req.authorization.id;

    try {
      const scheduleArray = await createScheduleArray(year, parseInt(month, 10), userId);
      res.status(StatusCodes.OK).json({ monthArray: scheduleArray });
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  });
};

const getScheduleById = (req, res) => {
  ensureAuthorization(req, res, () => {
    const scheduleId = req.params.id;
    const userId = req.authorization.id;

    const sql = `
      SELECT title, detail, start_date, end_date, start_time, end_time
      FROM schedules
      WHERE id = ? AND user_id = ?
    `;

    const values = [scheduleId, userId];

    conn.query(sql, values, (err, results) => {
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
    const id = req.authorization.id;
    const { title, detail, startDate, endDate, startTime, endTime } = req.body;
    const sql = `
      INSERT INTO schedules (user_id, title, detail, start_date, end_date, start_time, end_time) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [id, title, detail, startDate, endDate, startTime, endTime];

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
    const userId = req.authorization.id;
    const scheduleId = req.params.id;
    const { title, detail, startDate, endDate, startTime, endTime } = req.body;

    const sql = `
      UPDATE schedules
      SET title = ?, detail = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?
      WHERE id = ? AND user_id = ?
    `;

    const values = [title, detail, startDate, endDate, startTime, endTime, scheduleId, userId];

    conn.query(sql, values, (err, results) => {
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

const deleteSchedule = (req, res) => {
  ensureAuthorization(req, res, () => {
    const userId = req.authorization.id;
    const scheduleId = req.params.id;

    const sql = `
      DELETE FROM schedules 
      WHERE id = ? AND user_id = ?
    `;

    const values = [scheduleId, userId];

    conn.query(sql, values, (err, results) => {
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
  getSchedulesByFourDays,
  getSchedules,
  getMonthlyArray,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
