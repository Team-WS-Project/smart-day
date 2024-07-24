import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface DailyTodo {
  todoId?: string;
  date: string;
  title: string;
  details?: string;
  completed?: string;
}

interface dailyTodoStore {
  dailyTodo: DailyTodo[];
  actions: {
    addTodo: (newSchedule: DailyTodo) => void;
    updateTodo: (index: number, updateSchedule: DailyTodo) => void;
    removeTodo: (index: number) => void;
    clearTodo: () => void;
  };
}

const dailyTodoStore: StateCreator<dailyTodoStore> = (set) => ({
  dailyTodo: [
    {
      date: "2024-08-10",
      title: "자격증 시험",
      details: "",
    },
    {
      date: "2024-09-12",
      title: "토익",
      details: "",
    },
    {
      date: "2024-12-25",
      title: "해외 여행 숙소 결제",
      details: "",
    },
  ],
  actions: {
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
    clearTodo: () =>
      set(() => ({
        dailyTodo: [],
      })),
  },
});

const useDailyTodoStore = create<dailyTodoStore>()(devtools(dailyTodoStore, { name: "Todo Store" }));

export default useDailyTodoStore;
