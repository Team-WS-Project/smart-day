import { baseAxios } from "./baseAPI";

export const getDailyTodos = async (date: Date) => {
  try {
    const res = await baseAxios.get("/schedules", {
      params: {
        today: date.toISOString().slice(0, 10),
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
