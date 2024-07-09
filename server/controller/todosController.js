const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getTodos = (req, res) => {
  // TODO: user_id는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { userId } = req.body;
  const { today, month } = req.query;

  let sql = `SELECT id, due_date, title, completed FROM todos WHERE user_id = ? `;
  let values = [];

  if (today) {
    values.push(userId, today);
    sql += `AND due_date >= ?`;
  } else if (month) {
    values.push(userId, month + "%");
    sql += `AND due_date LIKE ?`;
  } else {
    values = [userId];
  }

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

const addTodos = (req, res) => {
  // TODO: userId는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { title, detail, dueDate, userId } = req.body;

  let sql = `INSERT INTO todos (title, detail, due_date, user_id) VALUES(?, ?, ?, ?)`;
  let values = [title, detail, dueDate, userId];

  if (detail === undefined) {
    sql = `INSERT INTO todos (title, due_date, user_id) VALUES(?, ?, ?)`;
    values = [title, dueDate, userId];
  }

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

const updateTodos = (req, res) => {
  const { id } = req.params;
  const { title, detail, dueDate } = req.body;

  let sql = `UPDATE todos SET title = ?, detail = ?, due_date = ? WHERE id = ?`;
  let values = [title, detail, dueDate, id];

  if (detail === undefined) {
    sql = `UPDATE todos SET title = ?, due_date = ? WHERE id = ?`;
    values = [title, dueDate, id];
  }

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
