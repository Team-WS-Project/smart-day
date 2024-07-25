import { dailyTodo, dailyTodoContent, dailyTodoTitle } from "./DailyTodo.css";
import { toggleTodoScheduleModal } from "../../../../store/modalStore";
import { DailyTodo } from "../../../../store/todoStore";
import useTodoScheduleStore from "../../../../store/todoScheduleStore";

const DayTodoModal = ({ id, due_date, title }: DailyTodo) => {
  const { setSelectedTodoId } = useTodoScheduleStore();

  const handelOnClickTodo = () => {
    setSelectedTodoId(id);
    toggleTodoScheduleModal();
  };

  return (
    <div className={dailyTodo} onClick={handelOnClickTodo}>
      <div className={dailyTodoTitle}>{due_date}</div>
      <div className={dailyTodoContent}>{title}</div>
    </div>
  );
};

export default DayTodoModal;
