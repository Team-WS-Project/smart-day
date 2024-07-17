import React, { useState } from "react";
import { todo, todolistDetail } from "./Todo.css";
import useCalendarPageStore from "../../../../store/calendarStore";

const Todo = ({
  id,
  dueDate,
  isCheck,
  title,
  description,
}) => {
  const [isChecked, setIsChecked] = useState(isCheck);
  const { toggleTodoIsDone } = useCalendarPageStore((state) => state.actions);
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleTodoIsDone(id);
  };

  return (
    <div>
      <div className={todo}>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <text
          style={{
            textDecoration: isChecked ? "line-through" : "none",
          }}
          onClick={() => alert("투두리스트 모달 열기")}
        > {String(dueDate.getMonth() + 1) + "/" + String(dueDate.getDate())}
        </text>
        </div>
        <div className={todolistDetail}>
        <text
          style={{
            textDecoration: isChecked ? "line-through" : "none",
            padding: "3%",
          }}
        > {title}
        </text>
      </div>
    </div>
  );
};

export default Todo;
