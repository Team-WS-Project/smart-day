const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");

const { getTodosQuery, addTodosQuery, updateTodosQuery } = require("../models/todosQueries");

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

const addTodos = (req, res) => {
  // TODO: userId는 users랑 합칠때 authorization.id로 변경될 것 (@ hyoeun0001)
  const { title, detail, dueDate } = req.body;

  ensureAuthorization(req, res, () => {
    const id = req.authorization.id;
    const [sql, values] = addTodosQuery({ title, detail, dueDate, id });

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
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

const updateTodos = (req, res) => {
  const { id } = req.params;
  const { title, detail, dueDate } = req.body;

  ensureAuthorization(req, res, () => {
    const [sql, values] = updateTodosQuery({ id, title, detail, dueDate });

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
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
        console.error(err);
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
        console.error(err);
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
