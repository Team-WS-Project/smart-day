import { useState } from "react";
import { todo, todolistDetail } from "./Todo.css";
import useCalendarPageStore from "../../../../store/calendarStore";
import { toggleTodoScheduleModal } from "../../../../store/modalStore";
import useTodoScheduleStore from "../../../../store/todoScheduleStore";
import { changeCompleted } from "../../../../apis/todolistAPIs";

interface TodoProps {
  id: number;
  dueDate: string;
  isCheck: boolean;
  title: string;
}

const Todo = ({ id, dueDate, isCheck, title }: TodoProps) => {
  const [isChecked, setIsChecked] = useState(isCheck);
  const { toggleTodoIsDone } = useCalendarPageStore((state) => state.actions);
  const setSelectedTodoId = useTodoScheduleStore((state) => state.setSelectedTodoId);

  const fetchToggleTodos = async (id: number) => {
    try {
      await changeCompleted(id);
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
