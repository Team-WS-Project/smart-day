import React, { useState } from "react";
import { todo, todolistDetail } from "./Todo.css";
import useCalendarPageStore from "../../../../store/calendarStore";
import { putToggleCompleted } from "../../../../apis/calenderPageAPI";

// Todo 컨테이너에 해당하는 props Todo 모달과 통일 필요
const Todo = ({ id, dueDate, isCheck, title, description }) => {
  const [isChecked, setIsChecked] = useState(isCheck);
  const { toggleTodoIsDone } = useCalendarPageStore((state) => state.actions);

  const fetchToggleTodos = async (todosId) => {
    try {
      const res = await putToggleCompleted(todosId);
      console.log(res?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleTodoIsDone(id);
    fetchToggleTodos(id);
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
        >
          {" "}
          {dueDate}
        </text>
      </div>
      <div className={todolistDetail}>
        <text
          style={{
            textDecoration: isChecked ? "line-through" : "none",
            padding: "3%",
          }}
        >
          {" "}
          {title}
        </text>
      </div>
    </div>
  );
};

export default Todo;
