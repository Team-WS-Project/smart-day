<<<<<<< HEAD
=======
const express = require("express");
const {
  addTodos,
  getTodos,
  getTodoDetail,
  editTodos,
  deleteTodos,
  changeCompleted,
} = require("../controller/todoController");

const router = express.Router();
router.use(express.json());

router.post("/", addTodos);
router.get("/", getTodos);
router.get("/:id", getTodoDetail);
router.put("/:id", editTodos);
router.put("/completed/:id", changeCompleted);
router.delete("/:id", deleteTodos);

module.exports = router;
>>>>>>> 6b44fb7 (review first modify)
