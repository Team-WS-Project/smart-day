import { baseAxios } from "./baseAPI";

export const editUserInfoAPI = async (location: string, nickname: string) => {
  try {
    await baseAxios.post("/users/update", { location: location, nickname: nickname });
  } catch (err) {
    console.error(err);
  }
};
