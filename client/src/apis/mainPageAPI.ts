import { baseAxios } from "./baseAPI";

export const getTaskListsAPI = async (standardDate: string) => {
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

export const postAddTaskAPI = async (
  title: string,
  detail: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
) => {
  try {
    const res = await baseAxios.post("/schedules", {
      title: title,
      detail: detail,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    });

    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};

export const putUpdateTaskAPI = async (
  id: number,
  title: string,
  detail: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
) => {
  try {
    const res = await baseAxios.put(`/schedules/${id}`, {
      title: title,
      detail: detail,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
    });

    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};

export const deleteTaskAPI = async (id: number) => {
  try {
    const res = await baseAxios.delete(`/schedules/${id}`);

    return res;
  } catch (error) {
    console.error("Error fetching task lists:", error);
  }
};
