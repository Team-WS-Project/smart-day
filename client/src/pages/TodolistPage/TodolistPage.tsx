import {
  appContainer,
  contentsContainer,
  completedList,
  uncompletedList,
  leftPanel,
  rightPanel,
  todoList,
  formTitle,
  noContent,
  addTodoButton,
} from "./TodolistPage.css";
import Todo from "./TodolistPageComponents/Todo";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";
import { useEffect, useState } from "react";
import useModalStore, { toggleTodoScheduleModal } from "../../store/modalStore";
import TodoScheduleModal from "../../components/ModalComponents/TodoScheduleModal/TodoScheduleModal";
import { getCompletedTodos, getFailureTodos, getTodayTodos } from "../../apis/todolistAPIs";
import RegisterModal from "../../components/ModalComponents/RegisterModal/RegisterModal";
import LoginModal from "../../components/ModalComponents/LoginModal/LoginModal";
import RegisterEditModal from "../../components/ModalComponents/RegisterEditModal/RegisterEditModal";
import CheckPasswordModal from "../../components/ModalComponents/RegisterEditModal/CheckPasswordModal/CheckPasswordModal";
import LocationModal from "../../components/ModalComponents/LocationModal/LocationModal";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../../store/userInfoStore";

type TTodo = {
  id: number;
  title: string;
  due_date: string;
  completed: boolean;
};

type Todos = {
  todayTodos: TTodo[];
  completedTodos: TTodo[];
  failureTodos: TTodo[];
};

type TodoDivision = "failure" | "today" | "completed";

const [FAILURE, TODAY, COMPLETED]: TodoDivision[] = ["failure", "today", "completed"];

const TodoListPage = () => {
  const todoScheduleModal = useModalStore((state) => state.todoScheduleModal);
  const { loginModal, userEditModal, locationModal, registerModal, pwCheckModal } = useModalStore();
  const userId = useUserInfoStore((state) => state.userId);
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todos>({
    todayTodos: [],
    completedTodos: [],
    failureTodos: [],
  });

  const fetchTodos = async () => {
    try {
      const todayResponse = await getTodayTodos();
      const completedResponse = await getCompletedTodos();
      const failureResponse = await getFailureTodos();
      setTodos({
        todayTodos: todayResponse?.data,
        completedTodos: completedResponse?.data,
        failureTodos: failureResponse?.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    if (!todoScheduleModal) {
      fetchTodos();
    }
  }, [todoScheduleModal, navigate]);

  const handleCheckboxChange = (todo: TTodo, todoDivision: TodoDivision) => {
    const today = new Date();
    const dueDate = new Date(todo.due_date);
    const timeDiff = dueDate.getTime() - today.getTime();

    if (todoDivision === FAILURE) {
      setTodos((prevState: Todos) => ({
        ...prevState,
        failureTodos: (prevState.failureTodos || []).filter((t) => t !== todo),
        completedTodos: [...(prevState.completedTodos || []), { ...todo, completed: true }],
      }));
    } else if (todoDivision === TODAY) {
      setTodos((prevState) => ({
        ...prevState,
        todayTodos: (prevState.todayTodos || []).filter((t) => t !== todo),
        completedTodos: [...(prevState.completedTodos || []), { ...todo, completed: true }],
      }));
    } else if (todoDivision === COMPLETED) {
      setTodos((prevState) => {
        const updatedCompleted = (prevState.completedTodos || []).filter((t) => t !== todo);
        if (timeDiff < 0) {
          return {
            ...prevState,
            completedTodos: updatedCompleted,
            failureTodos: [...(prevState.failureTodos || []), { ...todo, completed: false }],
          };
        } else {
          return {
            ...prevState,
            completedTodos: updatedCompleted,
            todayTodos: [...(prevState.todayTodos || []), { ...todo, completed: false }],
          };
        }
      });
    }
  };

  return (
    <>
      {todoScheduleModal ? <TodoScheduleModal /> : null}
      {registerModal && <RegisterModal />}
      {loginModal && <LoginModal />}
      {userEditModal && <RegisterEditModal />}
      {pwCheckModal && <CheckPasswordModal />}
      {locationModal && <LocationModal />}
      <div className={appContainer}>
        <Header />
        <div className={contentsContainer}>
          <div className={leftPanel}>
            <div className={uncompletedList}>
              <div className={formTitle}>기간 내 완료하지 못한 일들</div>
              {todos.failureTodos?.length > 0 ? (
                todos.failureTodos.map((elem) => {
                  return (
                    <div key={elem.id}>
                      <Todo
                        id={elem.id}
                        completed={elem.completed}
                        title={elem.title}
                        dueDate={elem.due_date}
                        onCheckboxChange={() => handleCheckboxChange(elem, FAILURE)}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={noContent}>기간 내 완료하지 못한 일이 없습니다.</div>
              )}
            </div>

            <div className={completedList}>
              <div className={formTitle}>완료한 일들</div>
              {todos.completedTodos?.length > 0 ? (
                todos.completedTodos.map((elem) => (
                  <div key={elem.id}>
                    <Todo
                      id={elem.id}
                      completed={elem.completed}
                      title={elem.title}
                      dueDate={elem.due_date}
                      onCheckboxChange={() => handleCheckboxChange(elem, COMPLETED)}
                    />
                  </div>
                ))
              ) : (
                <div className={noContent}>완료한 일이 없습니다.</div>
              )}
            </div>
          </div>

          <div className={rightPanel}>
            <div className={todoList}>
              <div className={formTitle}>해야할 일들</div>
              {todos.todayTodos?.length > 0 ? (
                todos.todayTodos.map((elem) => (
                  <div key={elem.id}>
                    <Todo
                      id={elem.id}
                      completed={elem.completed}
                      title={elem.title}
                      dueDate={elem.due_date}
                      onCheckboxChange={() => handleCheckboxChange(elem, TODAY)}
                    />
                  </div>
                ))
              ) : (
                <div className={noContent}>해야할 일이 없습니다.</div>
              )}
            </div>
            <div className={addTodoButton} onClick={toggleTodoScheduleModal}>
              <div>+ 할 일 추가</div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TodoListPage;
