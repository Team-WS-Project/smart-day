import {
  appContainer,
  contentsContainer,
  completedList,
  uncompletedList,
  leftPanel,
  rightPanel,
  todoList,
  formTitle,
} from "./TodolistPage.css";
import Todo from "./TodolistPageComponents/Todo";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";
import { useState } from "react";
import useModalStore from "../../store/store";
import TodoScheduleModal from "../../components/ModalComponents/TodoScheduleModal/TodoScheduleModal";

const [FAILURE, TODAY, COMPLETED] = ["failure", "today", "completed"];

const TodoListPage = () => {
  const todoScheduleModal = useModalStore((state) => state.todoScheduleModal);

  // 초기 todo 상태
  const [todos, setTodos] = useState({
    failureTodos: [
      {
        id: 1,
        completed: false,
        description: "프로젝트프로젝트프로젝트프로젝트프로젝트",
        dueDate: new Date("2024-05-10"),
        updatedAt: "2024-05-10",
      },
      {
        id: 2,
        completed: false,
        description: "프로젝트3",
        dueDate: new Date("2024-07-10"),
        updatedAt: undefined,
      },
      {
        id: 3,
        completed: false,
        description: "프로젝트4",
        dueDate: new Date("2024-04-10"),
        updatedAt: undefined,
      },
    ],
    completedTodos: [
      {
        id: 4,
        completed: true,
        description: "프로젝트2",
        dueDate: new Date("2024-08-10"),
        updatedAt: undefined,
      },
      {
        id: 5,
        completed: true,
        description: "프로젝트2",
        dueDate: new Date("2024-03-10"),
        updatedAt: undefined,
      },
      {
        id: 6,
        completed: true,
        description: "프로젝트2",
        dueDate: new Date("2024-06-10"),
        updatedAt: undefined,
      },
    ],
    todayTodos: [
      {
        id: 7,
        completed: false,
        description: "프로젝트3",
        dueDate: new Date("2024-12-10"),
        updatedAt: undefined,
      },
      {
        id: 8,
        completed: false,
        description: "프로젝트5",
        dueDate: new Date("2024-08-10"),
        updatedAt: "05-10",
      },
      {
        id: 9,
        completed: false,
        description: "프로젝트7",
        dueDate: new Date("2024-09-10"),
        updatedAt: "2024-05-10",
      },
    ],
  });

  const handleCheckboxChange = (todo, fromList) => {
    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    const timeDiff = dueDate.getTime() - today.getTime();

    if (fromList === FAILURE) {
      setTodos((prevState) => ({
        ...prevState,
        failureTodos: prevState.failureTodos.filter((t) => t !== todo),
        completedTodos: [...prevState.completedTodos, { ...todo, completed: true }],
      }));
    } else if (fromList === TODAY) {
      setTodos((prevState) => ({
        ...prevState,
        todayTodos: prevState.todayTodos.filter((t) => t !== todo),
        completedTodos: [...prevState.completedTodos, { ...todo, completed: true }],
      }));
    } else if (fromList === COMPLETED) {
      setTodos((prevState) => {
        const updatedCompleted = prevState.completedTodos.filter((t) => t !== todo);
        if (timeDiff < 0) {
          return {
            ...prevState,
            completedTodos: updatedCompleted,
            failureTodos: [...prevState.failureTodos, { ...todo, completed: false }],
          };
        } else {
          return {
            ...prevState,
            completedTodos: updatedCompleted,
            todayTodos: [...prevState.todayTodos, { ...todo, completed: false }],
          };
        }
      });
    }
  };

  return (
    <>
      {todoScheduleModal ? <TodoScheduleModal /> : null}
      <div className={appContainer}>
        <Header />
        <div className={contentsContainer}>
          <div className={leftPanel}>
            <div className={uncompletedList}>
              <div className={formTitle}>기간 내 완료하지 못한 일들</div>
              {/* DB에서 데이터받으면, ID를 key값으로 사용 */}
              {todos.failureTodos.map((elem, index) => (
                <div key={index}>
                  <Todo
                    completed={elem.completed}
                    description={elem.description}
                    dueDate={elem.dueDate}
                    onCheckboxChange={() => handleCheckboxChange(elem, FAILURE)}
                  />
                </div>
              ))}
            </div>

            <div className={completedList}>
              <div className={formTitle}>완료한 일들</div>
              {/* DB에서 데이터받으면, ID를 key값으로 사용 */}
              {todos.completedTodos.map((elem, index) => (
                <div key={index}>
                  <Todo
                    completed={elem.completed}
                    description={elem.description}
                    dueDate={elem.dueDate}
                    onCheckboxChange={() => handleCheckboxChange(elem, COMPLETED)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={rightPanel}>
            <div className={todoList}>
              <div className={formTitle}>해야할 일들</div>
              {/* DB에서 데이터받으면, ID를 key값으로 사용 */}
              {todos.todayTodos.map((elem, index) => (
                <div key={index}>
                  <Todo
                    completed={elem.completed}
                    description={elem.description}
                    dueDate={elem.dueDate}
                    onCheckboxChange={() => handleCheckboxChange(elem, TODAY)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TodoListPage;
