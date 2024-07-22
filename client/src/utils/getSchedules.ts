import axios from "axios";
axios.defaults.withCredentials = true;

const getSchedules = axios.create({
  baseURL: "http://localhost:9542/schedules",
  params: {
    start: "",
    end: "",
  },

  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJraW1AbWFpbC5jb20iLCJpYXQiOjE3MjE2MjUxODQsImV4cCI6MTcyMTYyNTQ4NCwiaXNzIjoiU21hcnREYXkifQ.6xDISZF9z4gIvGXSDvAKCof0pNllkDUMpejJELeIKhI",
  },
  withCredentials: true,
});

export default getSchedules;
