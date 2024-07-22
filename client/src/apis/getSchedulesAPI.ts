import { baseAxios } from "./baseAPI";

export const getSchedulesAPI = async (startDate: Date, endDate: Date) => {
  try {
    const res = await baseAxios.get("/schedules", {
      params: {
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
