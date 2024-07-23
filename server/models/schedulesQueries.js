const conn = require("../mariadb");

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
      SELECT id, user_id, title, start_date, end_date, start_time, end_time
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

const getScheduleByIdQuery = (scheduleId, userId) => ({
  sql: `
      SELECT title, detail, start_date, end_date, start_time, end_time
      FROM schedules
      WHERE id = ? AND user_id = ?
    `,
  values: [scheduleId, userId],
});

const createScheduleQuery = (userId, title, detail, startDate, endDate, startTime, endTime) => ({
  sql: `
      INSERT INTO schedules (user_id, title, detail, start_date, end_date, start_time, end_time) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  values: [userId, title, detail, startDate, endDate, startTime, endTime],
});

const updateScheduleQuery = (scheduleId, userId, title, detail, startDate, endDate, startTime, endTime) => ({
  sql: `
      UPDATE schedules
      SET title = ?, detail = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?
      WHERE id = ? AND user_id = ?
    `,
  values: [title, detail, startDate, endDate, startTime, endTime, scheduleId, userId],
});

const deleteScheduleQuery = (scheduleId, userId) => ({
  sql: `
      DELETE FROM schedules 
      WHERE id = ? AND user_id = ?
    `,
  values: [scheduleId, userId],
});

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
        console.error(err);
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

module.exports = {
  getScheduleByPeriod,
  getSchedulesQuery,
  getScheduleByIdQuery,
  createScheduleQuery,
  updateScheduleQuery,
  deleteScheduleQuery,
  createScheduleArray,
};
