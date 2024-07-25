import { baseAxios } from "./baseAPI";

type Todo = {
  todoId?: number | null;
  title: string;
  detail: string | null;
  dueDate: string;
};

export const createTodo = async ({ title, detail, dueDate }: Todo) => {
  try {
    await baseAxios.post("/todos", {
      title,
      detail,
      dueDate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async ({ todoId, title, detail, dueDate }: Todo) => {
  try {
    await baseAxios.put(`todos/${todoId}`, {
      title,
      detail,
      dueDate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    await baseAxios.delete(`todos/${todoId}`, {});
  } catch (error) {
    console.log(error);
  }
};
