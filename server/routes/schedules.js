const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const {
  getAllSchedules,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controller/schedulesController");

router.use(express.json());

router.get("/", getAllSchedules);
router.get("/detail/:id", getScheduleById);
router.post("/", addSchedule);
router.put("/:id", updateSchedule);
router.delete("/delete/:id", deleteSchedule);

module.exports = router;
