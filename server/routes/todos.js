const express = require("express");
const {
  getTodos,
  getFailureTodos,
  getCompletedTodos,
  getTodoDetail,
  addTodos,
  updateTodos,
  changeCompleted,
  deleteTodos,
} = require("../controller/todosController");

const router = express.Router();
router.use(express.json());

router.get("/", getTodos);
router.get("/failure", getFailureTodos);
router.get("/completed", getCompletedTodos);
router.get("/:id", getTodoDetail);
router.post("/", addTodos);
router.put("/:id", updateTodos);
router.put("/completed/:id", changeCompleted);
router.delete("/:id", deleteTodos);

module.exports = router;
