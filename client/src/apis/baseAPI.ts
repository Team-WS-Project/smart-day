// base.api.ts // base.ts

import axios from "axios";

// baseAxios -> http , httpClient
export const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
