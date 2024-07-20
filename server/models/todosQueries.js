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

module.exports = {
  getTodosQuery,
  addTodosQuery,
  updateTodosQuery,
};
