import { useState } from "react";
import { checkBox, descriptionArea, dueDateArea, todoContainer } from "./Todo.css";

const Todo = ({ isChecked, description, dueDate }) => {
  const [checked, setChecked] = useState(isChecked);

  return (
    <div className={todoContainer}>
      <input type={"checkbox"} className={checkBox} checked={checked} onClick={() => setChecked(!checked)} />
      <div className={descriptionArea}>{description}</div>
      {/* dueDate가 어떤 형식으로 오느냐에 따라 바꿔야함 */}
      <div className={dueDateArea}>{dueDate.slice(-5)}</div>
    </div>
  );
};

export default Todo;
