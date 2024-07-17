import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface task {
  userId?: string;
  date: string;
  startTime: string;
  endTime: string;
  details: string;
}

interface TaskStore {
  task: task;
  updateTask: (date: string, startTime: string, endTime: string, details: string) => void;
  updateDateTask: (date: string) => void;
}

const taskStore: StateCreator<TaskStore> = (set) => ({
  task: {
    date: "01/01/2024",
    startTime: "09:00",
    endTime: "12:00",
    details: "내용",
  },

  updateTask: (date, startTime, endTime, details) =>
    set((state) => ({
      task: {
        ...state.task,
        date,
        startTime,
        endTime,
        details,
      },
    })),

  updateDateTask: (date) =>
    set((state) => ({
      task: {
        ...state.task,
        date,
      },
    })),
});

const useTaskStore = create<TaskStore>()(devtools(taskStore, { name: "Task Store" }));

export default useTaskStore;
