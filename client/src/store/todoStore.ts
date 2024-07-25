import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface DailyTodo {
  id: number;
  due_date: string;
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
  dailyTodo: [],
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
