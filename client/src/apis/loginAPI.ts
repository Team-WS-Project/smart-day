import { baseAxios } from "./baseAPI";

export const requestLoginAPI = async (email: string, password: string) => {
  try {
    const res = await baseAxios.post("/users/login", { email: email, password: password });
    return res;
  } catch (err) {
    console.error(err);
  }
};
