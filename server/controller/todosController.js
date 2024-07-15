const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");

//TODO: SQL로 테이블과 연결되는 부분은 나중에 파일 분리할 예정 (@ hyoeun0001)
function getTodayTodos({ email, today, month, completed }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_email = ? AND due_date >= ? AND completed = 0`;
  const values = [email, today];

  return [sql, values];
}

function getMonthTodos({ email, today, month, completed }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_email = ? AND due_date LIKE ?`;
  const values = [email, month + "%"];

  return [sql, values];
}

function getDefaultTodos({ email, today, month, completed }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_email = ? `;
  const values = [email];

  return [sql, values];
}

function getFailureTodos({ email, today, month, completed }) {
  const sql = `SELECT id, title, due_date, completed FROM todos WHERE user_email = ? AND due_date < ? AND completed = 0`;
  const values = [email, today];

  return [sql, values];
}

function getCompletedTodos({ email, today, month, completed }) {
  const sql = `SELECT id, title, due_date, completed FROM todos WHERE user_email = ? AND completed = 1`;
  const values = [email];

  return [sql, values];
}

function getTodosQuery({ email, today, month, completed }) {
  if (today) {
    if (completed === undefined) {
      return getTodayTodos({ email, today, month, completed });
    }
    if (completed === "true") {
      return getCompletedTodos({ email, today, month, completed });
    }
    if (completed === "false") {
      return getFailureTodos({ email, today, month, completed });
    }
  } else if (month) {
    return getMonthTodos({ email, today, month, completed });
  } else {
    return getDefaultTodos({ email, today, month, completed });
  }
}

const getTodos = (req, res) => {
  // TODO: user_id는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { today, month, completed } = req.query;

  ensureAuthorization(req, res, () => {
    const email = req.authorization.email;
    const [sql, values] = getTodosQuery({ email, today, month, completed });

    conn.query(sql, values, (err, results) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length > 0) {
        res.status(StatusCodes.OK).json(results);
      } else {
        res.status(StatusCodes.NOT_FOUND).json(results);
      }
    });
  });
};

const getTodoDetail = (req, res) => {
  const { id } = req.params;

  ensureAuthorization(req, res, () => {
    const values = [id];
    const sql = `SELECT * FROM todos WHERE id = ?`;

    conn.query(sql, values, (err, results) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length > 0) {
        res.status(StatusCodes.OK).json(results);
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ massage: "찾으시는 할 일이 없습니다." });
      }
    });
  });
};

function addDefaultTodos({ title, detail, dueDate, email }) {
  const sql = `INSERT INTO todos (title, detail, due_date, user_email) VALUES(?, ?, ?, ?)`;
  const values = [title, detail, dueDate, email];

  return [sql, values];
}

function addTodosAsDetailNull({ title, detail, dueDate, email }) {
  const sql = `INSERT INTO todos (title, due_date, user_email) VALUES(?, ?, ?)`;
  const values = [title, dueDate, email];

  return [sql, values];
}

function addTodosQuery({ title, detail, dueDate, email }) {
  if (detail == undefined) {
    return addTodosAsDetailNull({ title, detail, dueDate, email });
  }

  return addDefaultTodos({ title, detail, dueDate, email });
}

const addTodos = (req, res) => {
  // TODO: userId는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { title, detail, dueDate } = req.body;

  ensureAuthorization(req, res, () => {
    const email = req.authorization.email;
    const [sql, values] = addTodosQuery({ title, detail, dueDate, email });

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.affectedRows === 0) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      } else {
        return res.status(StatusCodes.CREATED).json(results);
      }
    });
  });
};

function updateDefaultTodos({ id, title, detail, dueDate }) {
  const sql = `UPDATE todos SET title = ?, detail = ?, due_date = ? WHERE id = ?`;
  const values = [title, detail, dueDate, id];

  return [sql, values];
}

function updateTodosAsDetailNull({ id, title, detail, dueDate }) {
  const sql = `UPDATE todos SET title = ?, due_date = ? WHERE id = ?`;
  const values = [title, dueDate, id];

  return [sql, values];
}

function updateTodosQuery({ id, title, detail, dueDate }) {
  if (detail == undefined) {
    return updateTodosAsDetailNull({ id, title, detail, dueDate });
  }

  return updateDefaultTodos({ id, title, detail, dueDate });
}

const updateTodos = (req, res) => {
  const { id } = req.params;
  const { title, detail, dueDate } = req.body;

  ensureAuthorization(req, res, () => {
    const [sql, values] = updateTodosQuery({ id, title, detail, dueDate });

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.affectedRows === 0) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      } else {
        res.status(StatusCodes.OK).json(results);
      }
    });
  });
};

const changeCompleted = (req, res) => {
  const { id } = req.params;

  ensureAuthorization(req, res, () => {
    let sql = `UPDATE todos SET completed = NOT completed WHERE id = ?`;

    conn.query(sql, [id], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  });
};

const deleteTodos = (req, res) => {
  const { id } = req.params;

  ensureAuthorization(req, res, () => {
    const sql = `DELETE FROM todos WHERE id = ? `;
    conn.query(sql, id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results) {
        res.status(StatusCodes.OK).json(results);
      }
    });
  });
};

module.exports = {
  getTodos,
  getTodoDetail,
  addTodos,
  updateTodos,
  changeCompleted,
  deleteTodos,
};
