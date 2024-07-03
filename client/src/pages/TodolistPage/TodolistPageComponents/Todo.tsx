import { useState } from "react";
import {
  checkBox,
  descriptionArea,
  dueDateArea,
  todoContainer,
} from "./Todo.css";

const Todo = ({ checked, description, dueDate }) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className={todoContainer}>
      <input
        type={"checkbox"}
        className={checkBox}
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
      />
      <div className={descriptionArea}>{description}</div>
      <div className={dueDateArea}>{dueDate}</div>
    </div>
  );
};

export default Todo;
