import { baseAxios } from "./baseAPI";

export const getTaskListsAPI = async (standardDate) => {
  try {
    const res = await baseAxios.get("/schedules/fourdays", {
      params: { date: standardDate },
    });

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};
