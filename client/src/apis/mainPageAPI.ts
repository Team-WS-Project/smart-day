import { baseAxios } from "./baseAPI";

export const getTaskListsAPI = async (standardDate) => {
  try {
    const res = await baseAxios.get("/schedules/fourdays", {
      params: { standardDate: standardDate },
    });

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};

export const postAddTaskAPI = async (title, detail, startDate, endDate, startTime, endTime) => {
  try {
    const res = await baseAxios.post("/schedules", {
      title: title,
      detail: detail,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    });

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};

export const putUpdateTaskAPI = async (id, title, detail, startDate, endDate, startTime, endTime) => {
  try {
    const res = await baseAxios.put(`/schedules/${id}`, {
      title: title,
      detail: detail,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
    });

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};

export const deleteTaskAPI = async (id) => {
  try {
    const res = await baseAxios.delete(`/schedules/${id}`);

    // 응답 처리
    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};
