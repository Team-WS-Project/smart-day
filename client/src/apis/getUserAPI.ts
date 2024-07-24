import { baseAxios } from "./baseAPI";

export const getUser = async (password: string) => {
  try {
    const res = await baseAxios.get("/users/update", {});
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
