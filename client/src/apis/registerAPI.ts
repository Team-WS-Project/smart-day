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
    console.error(err);
    alert("회원가입에 실패했습니다! 다시 시작해주세요");
  }
};
