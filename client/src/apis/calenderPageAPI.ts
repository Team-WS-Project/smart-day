import { baseAxios } from "./baseAPI";

export const getIsHaveTask = async (nowYear: string, nowMonth: string) => {
  try {
    const res = await baseAxios.get("/schedules/calendar", {
      params: {
        year: nowYear,
        month: nowMonth,
      },
    });

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};

export const getTodolist = async (nowDate: string) => {
  try {
    const res = await baseAxios.get("/todos", {
      params: { month: nowDate },
    });

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};

export const putToggleCompleted = async (todosId: string) => {
  try {
    const res = await baseAxios.put("/todos/completed", {
      params: { todosId },
    });

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};
