import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface todoSchedule {
  userId?: string;
  date: string;
  title: string;
  details: string;
}

interface TodoScheduleStore {
  todoSchedule: todoSchedule;
  updateTodoSchedule: (date: string, title: string, details: string) => void;
}

const todoScheduleStore: StateCreator<TodoScheduleStore> = (set) => ({
  todoSchedule: {
    date: "01/01/2024",
    title: "제목",
    details: "내용",
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
});

const useTodoScheduleStore = create<TodoScheduleStore>()(devtools(todoScheduleStore));

export default useTodoScheduleStore;
