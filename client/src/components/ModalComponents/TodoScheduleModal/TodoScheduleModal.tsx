import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  todoClose,
  todoContent,
  todoDate,
  todoDatePicker,
  todoInput,
  todoSave,
  todoSaveBackground,
  todoScheduleCenter,
  todoScheduleContainer,
  todoScheduleLeft,
  todoScheduleTitle,
  todoString,
  todoTrash,
  trash,
} from "./TodoScheduleModal.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { wrapper } from "../RegisterModal/RegisterModal.css";
import { toggleTodoScheduleModal } from "../../../store/modalStore";
import useTodoScheduleStore from "../../../store/todoScheduleStore";
import { getTodoInfo } from "../../../apis/todolistAPIs";
import { createTodo, updateTodo } from "../../../apis/todoModalAPIs";
import dayjs from "dayjs";
import { ko } from "date-fns/locale";

const TodoScheduleModal = () => {
  const { todoSchedule, setSelectedTodoId, updateTodoSchedule } = useTodoScheduleStore();

  const [title, setTitle] = useState(todoSchedule.title);
  const [detail, setDetail] = useState(todoSchedule.details);
  const [dueDate, setdueDate] = useState(todoSchedule.date);

  useEffect(() => {
    const fetchTodoInfo = async () => {
      if (todoSchedule.selectedTodoId) {
        const res = await getTodoInfo(todoSchedule.selectedTodoId);
        if (res?.data.length > 0) {
          setdueDate(res?.data[0].due_date);
          setTitle(res?.data[0].title);
          setDetail(res?.data[0].detail || "");

          updateTodoSchedule(res?.data[0].due_date, res?.data[0].title, res?.data[0].detail || "");
        }
      }
    };
    fetchTodoInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoSchedule.selectedTodoId]);

  const handleSaveButton = async () => {
    if (todoSchedule.selectedTodoId) {
      await updateTodo({
        todoId: todoSchedule.selectedTodoId,
        title,
        detail,
        dueDate,
      });
    } else {
      await createTodo({
        title,
        detail,
        dueDate,
      });
    }

    toggleTodoScheduleModal();
    setSelectedTodoId(null);
    updateTodoSchedule(dayjs(new Date()).format("YYYY-MM-DD"), "제목", "내용");
  };

  const handleCloseButton = () => {
    toggleTodoScheduleModal();
    setSelectedTodoId(null);
    updateTodoSchedule(dayjs(new Date()).format("YYYY-MM-DD"), "제목", "내용");
  };

  const handleDeleteButton = async () => {
    if (todoSchedule.selectedTodoId) {
      //await deleteTodo(todoSchedule.selectedTodoId);
    }
    toggleTodoScheduleModal();
    setSelectedTodoId(null);
    updateTodoSchedule(dayjs(new Date()).format("YYYY-MM-DD"), "제목", "내용");
  };

  return (
    <div className={wrapper}>
      <div className={todoScheduleContainer}>
        <div className={todoScheduleLeft}>
          <div className={todoTrash}>
            <FaRegTrashAlt className={trash} onClick={handleDeleteButton} />
          </div>
        </div>
        <div className={todoScheduleCenter}>
          <div className={todoScheduleTitle}>Todo</div>
          <div className={todoDate}>
            <div className={todoString}>기한 : </div>
            <div>
              <DatePicker
                locale={ko}
                dateFormatCalendar="YYYY년 MMMM"
                selected={new Date(dueDate)}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setdueDate(dayjs(date).format("YYYY-MM-DD"))}
                className={todoDatePicker}
              />
            </div>
          </div>

          <div className={todoDate}>
            <div className={todoString}>제목 : </div>
            <input
              className={todoInput}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>

          <div className={todoString}>내용 : </div>
          <textarea
            className={todoContent}
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          ></textarea>
          <div className={todoSaveBackground}>
            <button className={todoSave} onClick={handleSaveButton}>
              저장
            </button>
          </div>
        </div>
        <VscChromeClose className={todoClose} onClick={handleCloseButton} />
      </div>
    </div>
  );
};

export default TodoScheduleModal;
