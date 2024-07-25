import dayjs from "dayjs";
import { baseAxios } from "./baseAPI";

export const getDailyTodos = async (date: Date) => {
  try {
    const res = await baseAxios.get("/todos", {
      params: {
        today: dayjs(date).format("YYYY-MM-DD"),
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
