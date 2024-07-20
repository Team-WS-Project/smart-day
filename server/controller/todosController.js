const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");

function getTodayTodos({ id, today }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_id = ? AND due_date >= ? AND completed = 0`;
  const values = [id, today];

  return [sql, values];
}

function getMonthTodos({ id, month }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_id = ? AND due_date LIKE ?`;
  const values = [id, month + "%"];

  return [sql, values];
}

function getDefaultTodos({ id }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_id = ? `;
  const values = [id];

  return [sql, values];
}

function getFailureTodos({ id, today }) {
  const sql = `SELECT id, title, due_date, completed FROM todos WHERE user_id = ? AND due_date < ? AND completed = 0`;
  const values = [id, today];

  return [sql, values];
}

function getCompletedTodos({ id }) {
  const sql = `SELECT id, title, due_date, completed FROM todos WHERE user_id = ? AND completed = 1`;
  const values = [id];

  return [sql, values];
}

function getTodosQuery({ id, today, month, completed }) {
  if (today) {
    if (completed === undefined) {
      return getTodayTodos({ id, today, month, completed });
    }
    if (completed === "true") {
      return getCompletedTodos({ id, today, month, completed });
    }
    if (completed === "false") {
      return getFailureTodos({ id, today, month, completed });
    }
  } else if (month) {
    return getMonthTodos({ id, today, month, completed });
  } else {
    return getDefaultTodos({ id, today, month, completed });
  }
}

const getTodos = (req, res) => {
  const { today, month, completed } = req.query;

  ensureAuthorization(req, res, () => {
    const id = req.authorization.id;
    const [sql, values] = getTodosQuery({ id, today, month, completed });

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

function addDefaultTodos({ title, detail, dueDate, id }) {
  const sql = `INSERT INTO todos (title, detail, due_date, user_id) VALUES(?, ?, ?, ?)`;
  const values = [title, detail, dueDate, id];

  return [sql, values];
}

function addTodosAsDetailNull({ title, dueDate, id }) {
  const sql = `INSERT INTO todos (title, due_date, user_id) VALUES(?, ?, ?)`;
  const values = [title, dueDate, id];

  return [sql, values];
}

function addTodosQuery({ title, detail, dueDate, id }) {
  if (detail == undefined) {
    return addTodosAsDetailNull({ title, detail, dueDate, id });
  }

  return addDefaultTodos({ title, detail, dueDate, id });
}

const addTodos = (req, res) => {
  // TODO: userId는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { title, detail, dueDate } = req.body;

  ensureAuthorization(req, res, () => {
    const id = req.authorization.id;
    const [sql, values] = addTodosQuery({ title, detail, dueDate, id });

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

function updateTodosAsDetailNull({ id, title, dueDate }) {
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
