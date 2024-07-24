import { baseAxios } from "./baseAPI";

type Todo = {
  todoId?: number | null;
  title: string;
  detail: string | null;
  dueDate: string;
};

export const createTodo = ({ title, detail, dueDate }: Todo) => {
  try {
    baseAxios.post("/todos", {
      title,
      detail,
      dueDate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = ({ todoId, title, detail, dueDate }: Todo) => {
  try {
    baseAxios.put(`todos/${todoId}`, {
      title,
      detail,
      dueDate,
    });
  } catch (error) {
    console.log(error);
  }
};
