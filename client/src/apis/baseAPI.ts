import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "http://localhost:9542",
  withCredentials: true,
});
