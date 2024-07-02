const express = require("express");
const router = express.Router();
const {
  addTodos,
  getTodos,
  getTodoDetail,
  editTodos,
  deleteTodos,
  changeCompleted,
} = require("../controller/todoController");

router.use(express.json());

router.post("/", addTodos);
router.get("/", getTodos);
router.get("/:id", getTodoDetail);
router.put("/:id", editTodos);
router.delete("/:id", deleteTodos);
router.put("/completed/:id", changeCompleted);

module.exports = router;
