const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");
const {
  getSchedulesQuery,
  getScheduleByPeriod,
  deleteScheduleQuery,
  updateScheduleQuery,
  createScheduleQuery,
  getScheduleByIdQuery,
  createScheduleArray,
} = require("../models/schedulesQueries");

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

const getSchedulesByFourDays = async (req, res) => {
  ensureAuthorization(req, res, async () => {
    const userId = req.authorization.id;
    const { standardDate } = req.query;

    const startDate = new Date(standardDate);
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

    const endDate = addDays(startDate, daysToAdd - 1);

    const sql = `
      SELECT id, start_date, start_time, end_time, title, detail 
      FROM schedules 
      WHERE user_id = ? 
      AND start_date BETWEEN ? AND ?
      ORDER BY start_date ASC, start_time ASC
    `;

    const values = [userId, formatDate(startDate), formatDate(endDate)];

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
        id: result.id,
        date: new Date(result.start_date).toISOString().split("T")[0],
        startTime: result.start_time,
        endTime: result.end_time,
        title: result.title,
        detail: result.detail,
      }));

      const allDates = {};
      for (let i = 0; i < daysToAdd; i++) {
        const currentDate = formatDate(addDays(startDate, i));
        allDates[currentDate] = [];
      }

      tasks.forEach((task) => {
        if (!allDates[task.date]) {
          allDates[task.date] = [];
        }
        allDates[task.date].push(task);
      });

      const groupedTasksArray = Object.keys(allDates)
        .sort()
        .map((date) => {
          return allDates[date].sort((a, b) => {
            return a.startTime.localeCompare(b.startTime);
          });
        });

      return res.status(StatusCodes.OK).json(groupedTasksArray);
    } catch (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  });
};

const getScheduleById = (req, res) => {
  ensureAuthorization(req, res, () => {
    const scheduleId = req.params.id;
    const userId = req.authorization.id;
    const { sql, values } = getScheduleByIdQuery(scheduleId, userId);

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
    const { sql, values } = createScheduleQuery(id, title, detail, startDate, endDate, startTime, endTime);

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

    const { sql, values } = updateScheduleQuery(
      scheduleId,
      userId,
      title,
      detail,
      startDate,
      endDate,
      startTime,
      endTime,
    );

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
    const { sql, values } = deleteScheduleQuery(scheduleId, userId);

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
