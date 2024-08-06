import dayjs from "dayjs";
import { baseAxios } from "./baseAPI";

export const getDailySchedules = async (date: Date) => {
  try {
    const res = await baseAxios.get("/schedules", {
      params: {
        date: dayjs(date).format("YYYY-MM-DD"),
      },
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
