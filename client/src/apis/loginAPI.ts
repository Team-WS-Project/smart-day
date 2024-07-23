import { baseAxios } from "./baseAPI";

export const requestLoginAPI = async (email: string, password: string) => {
  try {
    const res = await baseAxios.post("/users/login", { email: email, password: password });
    return res;
  } catch (err) {
    alert("이메일 또는 비밀번호를 확인해주세요.");
  }
};
