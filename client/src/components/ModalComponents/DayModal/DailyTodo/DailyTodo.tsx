import React from "react";
import { dailyTodo, dailyTodoContent, dailyTodoTitle } from "./DailyTodo.css";
import { toggleTodoScheduleModal } from "../../../../store/store";
import { DailyTodo } from "../../../../store/todoStore";

const DayTodoModal = ({ date, content }: DailyTodo) => {
  return (
    <div className={dailyTodo} onClick={toggleTodoScheduleModal}>
      <div className={dailyTodoTitle}>{date}</div>
      <div className={dailyTodoContent}>{content}</div>
    </div>
  );
};

export default DayTodoModal;
