import React, { useState } from "react";
import { todo, todolistDetail } from "./Todo.css";
import useCalendarPageStore from "../../../../store/calendarStore";
import { putToggleCompleted } from "../../../../apis/calenderPageAPI";
import { toggleTodoScheduleModal } from "../../../../store/modalStore";
import useTodoScheduleStore from "../../../../store/todoScheduleStore";
import { changeCompleted } from "../../../../apis/todolistAPIs";

// Todo 컨테이너에 해당하는 props Todo 모달과 통일 필요
const Todo = ({ id, dueDate, isCheck, title, description }) => {
  const [isChecked, setIsChecked] = useState(isCheck);
  const { toggleTodoIsDone } = useCalendarPageStore((state) => state.actions);
  const setSelectedTodoId = useTodoScheduleStore((state) => state.setSelectedTodoId);

  const fetchToggleTodos = async (id) => {
    try {
      const res = await changeCompleted(id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clickTodo = () => {
    setSelectedTodoId(id);
    toggleTodoScheduleModal();
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
          onClick={clickTodo}
        >
          {" "}
          {dueDate}
        </text>
      </div>
      <div className={todolistDetail} onClick={clickTodo}>
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
