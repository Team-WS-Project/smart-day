import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface task {
  taskId?: number;
  taskIndex: number;
  listIndex: number;
  date: string;
  startTime: string;
  endTime: string;
  detail?: string;
}

interface TaskStore {
  task: task;
  isNewTask: boolean;
  setIsNewTask: (isTrue: boolean) => void;
  updateTask: (nowTask: task) => void;
  updateDateTask: (date: string) => void;
}

const taskStore: StateCreator<TaskStore> = (set) => ({
  task: {
    taskIndex: 0,
    listIndex: 0,
    date: "2024-01-01",
    startTime: "09:00",
    endTime: "10:00",
    detail: "내용",
  },
  isNewTask: true,
  setIsNewTask: (isTrue: boolean) =>
    set(() => ({
      isNewTask: isTrue,
    })),
  updateTask: (nowTask: task) =>
    set(() => ({
      task: nowTask,
    })),
  updateDateTask: (date) =>
    set((state) => ({
      task: {
        ...state.task,
        date,
      },
    })),
  clearTask: () =>
    set(() => ({
      task: {
        taskIndex: 0,
        listIndex: 0,
        date: "2024-01-01",
        startTime: "09:00",
        endTime: "10:00",
        detail: "내용",
      },
    })),
});

const useTaskStore = create<TaskStore>()(devtools(taskStore, { name: "Task Store" }));

export default useTaskStore;
