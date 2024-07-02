//const ensureAuthorization = require('../auth');
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const addTodos = (req, res) => {
  //user_id는 users랑 합칠때 authorization.id로 변경될 것
  let { title, detail, due_date, user_id } = req.body;

  let sql = `INSERT INTO todos (title, detail, due_date, user_id) VALUES(?, ?, ?, ?)`;
  let values = [title, detail, due_date, user_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.affectedRows)
      return res.status(StatusCodes.CREATED).json(results);
    else return res.status(StatusCodes.BAD_REQUEST).end();
  });
};

const getTodos = (req, res) => {
  //user_id는 users랑 합칠때 authorization.id로 변경될 것
  const { user_id } = req.body;
  const {today} = req.query;

  let values = [user_id, today];
  let sql = `SELECT * FROM todos WHERE user_id = ? and due_date > ?`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length) {
      res.status(StatusCodes.OK).json(results);
    }
  });
};

const getTodoDetail = (req, res) => {
  const { id } = req.params;

  let values = [id];
  let sql = `SELECT * FROM todos WHERE id = ?`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length) {
      res.status(StatusCodes.OK).json(results);
    }
  });
};

const editTodos = (req, res) => {
  let { id } = req.params;
  let { title, detail, due_date, completed } = req.body;

  let sql = `UPDATE todos SET title = ?, detail = ?, due_date = ?, completed = ?
        WHERE id = ?`;

  let values = [title, detail, due_date, completed, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      res.status(StatusCodes.OK).json(results);
    }
  });
};

const deleteTodos = (req, res) => {
  const { id } = req.params;

  let sql = `DELETE FROM todos WHERE id = ? `;
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

const changeCompleted = async (req, res) => {
  const mariadb = require("mysql2/promise");
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "SmartDay",
    dateStrings: true,
  });
  const { id } = req.params;

  //delivery 삽입
  sql = `SELECT completed FROM todos WHERE id = ?`;
  let [todo, fields] = await conn.query(sql, [id]);

  let completed = [];
  todo.forEach((item) => completed.push(item.completed));

  if (completed == 0) {
    let sql = `UPDATE todos SET completed = ?
                    WHERE id = ?`;
    let values = [1, id];
    results = await conn.execute(sql, values);
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      res.status(StatusCodes.OK).json(results);
    }
  } else if (completed == 1) {
    let sql = `UPDATE todos SET completed = ?
                    WHERE id = ?`;
    let values = [0, id];
    results = await conn.execute(sql, values);
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      res.status(StatusCodes.OK).json(results);
    }
  }
};

module.exports = {
  addTodos,
  getTodos,
  getTodoDetail,
  editTodos,
  deleteTodos,
  changeCompleted,
};
