import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import dayjs from "dayjs";

const today = dayjs(new Date()).format("YYYY-MM-DD");

interface todoSchedule {
  userId?: string;
  date: string;
  title: string;
  details: string;
  selectedTodoId: number | null;
}

interface TodoScheduleStore {
  todoSchedule: todoSchedule;
  updateTodoSchedule: (date: string, title: string, details: string) => void;
  setSelectedTodoId: (todoId: number | null) => void;
}

const todoScheduleStore: StateCreator<TodoScheduleStore> = (set) => ({
  todoSchedule: {
    date: today,
    title: "제목",
    details: "내용",
    selectedTodoId: null,
  },

  updateTodoSchedule: (date, title, details) =>
    set((state) => ({
      todoSchedule: {
        ...state.todoSchedule,
        date,
        title,
        details,
      },
    })),
  setSelectedTodoId: (todoId: number | null) => {
    set((state) => ({
      todoSchedule: {
        ...state.todoSchedule,
        selectedTodoId: todoId,
      },
    }));
  },
});

const useTodoScheduleStore = create<TodoScheduleStore>()(devtools(todoScheduleStore, { name: "TodoSchedule Store" }));

export default useTodoScheduleStore;
