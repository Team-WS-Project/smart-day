import { baseAxios } from "./baseAPI";

export const requestRegisterAPI = async (email: string, password: string, location: string, nickname: string) => {
  try {
    const res = await baseAxios.post("/users/join", {
      email: email,
      password: password,
      location: location,
      nickname: nickname,
    });
    return res;
  } catch (err) {
    alert("등록 정보를 입력해주세요!");
  }
};
