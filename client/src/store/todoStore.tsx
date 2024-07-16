import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface DailyTodo {
  date: string;
  content: string;
}

interface dailyTodoStore {
  dailyTodo: DailyTodo[];
  addTodo: (newSchedule: DailyTodo) => void;
  updateTodo: (index: number, updateSchedule: DailyTodo) => void;
  removeTodo: (index: number) => void;
}

const dailyTodoStore: StateCreator<dailyTodoStore> = (set) => ({
  dailyTodo: [
    {
      date: "2024-08-10",
      content: "자격증 시험",
    },
    {
      date: "2024-09-12",
      content: "토익",
    },
    {
      date: "2024-12-25",
      content: "해외 여행 숙소 결제",
    },
  ],
  addTodo: (newTodos: DailyTodo) =>
    set((state) => ({
      dailyTodo: [...state.dailyTodo, newTodos],
    })),
  updateTodo: (index: number, updateTodo: DailyTodo) =>
    set((state) => ({
      dailyTodo: state.dailyTodo.map((todo, i) => (i === index ? updateTodo : todo)),
    })),
  removeTodo: (index: number) =>
    set((state) => ({
      dailyTodo: state.dailyTodo.filter((_, i) => i !== index),
    })),
});

const useDailyTodoStore = create<dailyTodoStore>()(devtools(dailyTodoStore));

export default useDailyTodoStore;
