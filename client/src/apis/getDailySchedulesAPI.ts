import { baseAxios } from "./baseAPI";

export const getDailySchedules = async (date: Date) => {
  try {
    const res = await baseAxios.get("/schedules", {
      params: {
        date: date.toISOString().slice(0, 10),
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
