import { baseAxios } from "./baseAPI";

export const requestLogoutAPI = async () => {
  try {
    const res = await baseAxios.post("/users/logout", {});
    return res;
  } catch (err) {
    alert("로그아웃에 실패했습니다. 다시 시도해주세요");
  }
};
