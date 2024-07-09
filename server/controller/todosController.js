const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

//TODO: SQL로 테이블과 연결되는 부분은 나중에 파일 분리할 예정 (@ hyoeun0001)
function getTodayTodos({ userId, today, month }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_id = ? AND due_date > ?`;
  const values = [userId, today];

  return [sql, values];
}

function getMonthTodos({ userId, today, month }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_id = ? AND due_date LIKE ?`;
  const values = [userId, month + "%"];

  return [sql, values];
}

function getDefaultTodos({ userId, today, month }) {
  const sql = `SELECT id, due_date, title, completed FROM todos WHERE user_id = ? `;
  const values = [userId];

  return [sql, values];
}

function getTodosQuery({ userId, today, month }) {
  if (today) {
    return getTodayTodos({ userId, today, month });
  }

  if (month) {
    return getMonthTodos({ userId, today, month });
  }

  return getDefaultTodos({ userId, today, month });
}

const getTodos = (req, res) => {
  // TODO: user_id는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { userId } = req.body;
  const { today, month } = req.query;

  const [sql, values] = getTodosQuery({ userId, today, month });

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
};

const getTodoDetail = (req, res) => {
  const { id } = req.params;

  const values = [id];
  const sql = `SELECT * FROM todos WHERE id = ?`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length > 0) {
      res.status(StatusCodes.OK).json(results);
    }
  });
};

function addDefaultTodos({ title, detail, dueDate, userId }) {
  const sql = `INSERT INTO todos (title, detail, due_date, user_id) VALUES(?, ?, ?, ?)`;
  const values = [title, detail, dueDate, userId];

  return [sql, values];
}

function addTodosAsDetailNull({ title, detail, dueDate, userId }) {
  const sql = `INSERT INTO todos (title, due_date, user_id) VALUES(?, ?, ?)`;
  const values = [title, dueDate, userId];

  return [sql, values];
}

function addTodosQuery({ title, detail, dueDate, userId }) {
  if (detail == undefined) {
    return addTodosAsDetailNull({ title, detail, dueDate, userId });
  }

  return addDefaultTodos({ title, detail, dueDate, userId });
}

const addTodos = (req, res) => {
  // TODO: userId는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { title, detail, dueDate, userId } = req.body;

  const [sql, values] = addTodosQuery({ title, detail, dueDate, userId });

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
};

const changeCompleted = (req, res) => {
  const { id } = req.params;

  let sql = `UPDATE todos SET completed = NOT completed WHERE id = ?`;

  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

const deleteTodos = (req, res) => {
  const { id } = req.params;

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
};

module.exports = {
  getTodos,
  getTodoDetail,
  addTodos,
  updateTodos,
  changeCompleted,
  deleteTodos,
};
