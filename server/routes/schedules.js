const express = require("express");

const {
<<<<<<< HEAD
  getSchedules,
  getMonthlyArray,
=======
  getAllSchedules,
>>>>>>> e7bc986 (0708 - edit getAllSchedules)
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controller/schedulesController");

const router = express.Router();
router.use(express.json());

<<<<<<< HEAD
router.get("/", getSchedules);
router.get("/calendar", getMonthlyArray);
=======
router.get("/", getAllSchedules);
>>>>>>> e7bc986 (0708 - edit getAllSchedules)
router.get("/detail/:id", getScheduleById);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
