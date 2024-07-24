import { baseAxios } from "./baseAPI";

export const getUser = async () => {
  try {
    const res = await baseAxios.get("/users/", {});
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
