const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");

//기간별 스케쥴 조회 SQL쿼리
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

//월별 스케쥴 조회 SQL 쿼리
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

//일별 스케쥴 조회 SQL 쿼리
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

//들어오는 매개변수에 따라 스케쥴 조회 쿼리 반환
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

  //전체 스케쥴 조회 쿼리
  return {
    sql: `SELECT id, user_id, title, detail, start_time, end_time, start_date 
    FROM schedules
    WHERE user_id = ?
    `,
    values: [id],
  };
};

//클라이언트의 요청을 처리하여 적절한 스케쥴 데이터 반환
const getSchedules = (req, res) => {
  const { start, end, date, month } = req.query;

  ensureAuthorization(req, res, () => {
    const id = req.authorization.id;
    if (id && start && end) {
      try {
        const scheduleTitles = getScheduleTitles(id, start, end);
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

//특정 기간의 스케쥴 조회해서 반환
const getScheduleTitles = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const { sql, value: values } = getScheduleByPeriod(startDate, endDate);
    console.log("Executing query:", sql);
    console.log("With values:", values);

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
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

//특정 연도와 월에 대한 스케쥴 배열 생성
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

//특정 연도와 월에 대한 스케쥴 배열 반환
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

//특정 스케쥴 조회
const getScheduleById = (req, res) => {
  const { id } = req.params;
  ensureAuthorization(req, res, () => {
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

      if (results.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).end();
      }

      res.status(StatusCodes.OK).json(results[0]);
    });
  });
};

//스케쥴 생성
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

//스케쥴 수정
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

//스케쥴 삭제
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
