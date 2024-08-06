import { baseAxios } from "./baseAPI";

const _date = new Date();
const _year = _date.getFullYear();
const _month = String(_date.getMonth() + 1).padStart(2, "0");
const _day = String(_date.getDate()).padStart(2, "0");
const today = `${_year}-${_month}-${_day}`;

const queryString = `/todos?today=${today}`;

export const getTodayTodos = async () => {
  const res = await baseAxios.get(queryString, {});
  return res;
};

// try catch 제거
export const getCompletedTodos = async () => {
  try {
    const res = await baseAxios.get(queryString + "&completed=true", {});
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getFailureTodos = async () => {
  try {
    const res = await baseAxios.get(queryString + "&completed=false", {});
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const changeCompleted = async (todoId: number) => {
  try {
    const res = await baseAxios.put(`/todos/completed/${todoId}`, {});
    return res;
  } catch (err) {
    console.error(err);
    throw Error;
  }
};

export const getTodoInfo = async (todoId: number) => {
  try {
    const res = await baseAxios.get(`todos/${todoId}`);
    return res;
  } catch (err) {
    console.error(err);
  }
};
