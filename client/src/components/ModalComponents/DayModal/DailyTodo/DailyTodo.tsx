import React from "react";
import { dailyTodo, dailyTodoContent, dailyTodoTitle } from "./DailyTodo.css";
import { toggleTodoScheduleModal } from "../../../../store/store";
import { DailyTodo } from "../../../../store/todoStore";

const DayTodoModal = ({ date, title }: DailyTodo) => {
  return (
    <div className={dailyTodo} onClick={toggleTodoScheduleModal}>
      <div className={dailyTodoTitle}>{date}</div>
      <div className={dailyTodoContent}>{title}</div>
    </div>
  );
};

export default DayTodoModal;
