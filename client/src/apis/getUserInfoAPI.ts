import { baseAxios } from "./baseAPI";

export const getUserInfoAPI = async (password: string) => {
  try {
    const res = await baseAxios.post("/users/verifyPassword", { password: password });
    if (res.status === 200) {
      const userInfo = await baseAxios.get("/users");
      return userInfo;
    } else {
      alert("비밀번호를 확인해주세요.");
      return null;
    }
  } catch (err) {
    alert("비밀번호를 확인해주세요.");
    return null;
  }
};
