import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface Todo {
  id: number;
  dueDate: Date;
  isDone: boolean;
  title: string;
  description: string;
}

interface CalendarPageState {
  isHaveTask: boolean[];
  todolist: Todo[];
  actions: {
    setIsHaveTask: (newArray: boolean[]) => void;
    changeIsHaveTask: (isEmpty: boolean) => void;
    setTodolist: (newTodolist: Todo[]) => void;
    toggleTodoIsDone: (id: number) => void;
  };
}

const calendarPageStore: StateCreator<CalendarPageState> = ((set) => ({
  todolist: [
    {
      id: 1,
      dueDate: new Date(),
      isDone: false,
      title: "프로젝트 2",
      description: "내용",
    },
  ],
  isHaveTask: [],
  actions: {
    setIsHaveTask: (newArray: boolean[]) => {
      set({
        isHaveTask: newArray,
      });
    },
    changeIsHaveTask: (isEmpty: boolean) => {

    },
    setTodolist: (newTodolist: Todo[]) => {
      set(() => ({todolist: newTodolist}));
    },
    toggleTodoIsDone: (id: number) => {
      set((state) => ({
        todolist: state.todolist.map((todo) =>
          todo.id === id ? { ...todo, isDone: !(todo.isDone) } : todo
        ),
      }));
    },
  }
}));

const useCalendarPageStore = create<CalendarPageState>()(devtools(calendarPageStore));

export default useCalendarPageStore;
