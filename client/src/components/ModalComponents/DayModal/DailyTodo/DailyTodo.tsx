import { dailyTodo, dailyTodoContent, dailyTodoTitle } from "./DailyTodo.css";
import { toggleTodoScheduleModal } from "../../../../store/modalStore";
import { DailyTodo } from "../../../../store/todoStore";

const DayTodoModal = ({ end_date, title }: DailyTodo) => {
  return (
    <div className={dailyTodo} onClick={toggleTodoScheduleModal}>
      <div className={dailyTodoTitle}>{end_date}</div>
      <div className={dailyTodoContent}>{title}</div>
    </div>
  );
};

export default DayTodoModal;
