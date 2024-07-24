import dayjs from "dayjs";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export type Task = {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  detail: string;
};

export type TaskList = {
  tasks: Task[];
};

interface MainState {
  dailyTaskLists: TaskList[];
  standardDate: Date;
  actions: {
    setStandardDate: () => void;
    changeDateBefore: () => void;
    changeDateAfter: () => void;
    changeTaskLists: (newTaskLists: TaskList[]) => void;
    addTask: (listIndex: number, newTask: Task) => void;
    updateTask: (listIndex: number, taskIndex: number, updatedTask: Task) => void;
    deleteTask: (listIndex: number, taskIndex: number) => void;
  };
}

const mainStore: StateCreator<MainState> = (set) => ({
  standardDate: new Date(),
  dailyTaskLists: [
    {
      tasks: [
        {
          date: dayjs(new Date()).format("YYYY-MM-DD"),
          startTime: "09:00",
          endTime: "11:00",
          title: "",
          detail: "운동",
        },
      ],
    },
    {
      tasks: [],
    },
    {
      tasks: [],
    },
    {
      tasks: [],
    },
  ],
  actions: {
    setStandardDate: () => {
      set(() => {
        return { standardDate: new Date() };
      });
    },
    changeDateBefore: () => {
      set((state) => {
        const newDate = new Date(state.standardDate);
        newDate.setDate(newDate.getDate() - 1);
        return { standardDate: newDate };
      });
    },
    changeDateAfter: () => {
      set((state) => {
        const newDate = new Date(state.standardDate);
        newDate.setDate(newDate.getDate() + 1);
        return { standardDate: newDate };
      });
    },
    changeTaskLists: (newTaskLists: TaskList[]) =>
      set(() => ({
        dailyTaskLists: newTaskLists,
      })),
    addTask: (listIndex: number, newTask: Task) =>
      set((state) => {
        const updatedLists = state.dailyTaskLists.map((list, index) => {
          if (index === listIndex) {
            const updatedTasks = [...list.tasks, newTask];
            console.log(updatedTasks);
            // startTime 기준으로 정렬
            updatedTasks.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
            return {
              ...list,
              tasks: updatedTasks,
            };
          }
          return list;
        });
        return { dailyTaskLists: updatedLists };
      }),
    updateTask: (listIndex, taskIndex, updatedTask) =>
      set((state) => {
        const updatedLists = state.dailyTaskLists.map((list, index) => {
          if (index === listIndex) {
            return {
              ...list,
              tasks: list.tasks.map((task, i) => (i === taskIndex ? updatedTask : task)),
            };
          }
          return list;
        });
        return { dailyTaskLists: updatedLists };
      }),
    deleteTask: (listIndex: number, taskIndex: number) =>
      set((state) => {
        const updatedLists = state.dailyTaskLists.map((list, index) => {
          if (listIndex === index) {
            return {
              ...list,
              tasks: list.tasks.filter((_, i) => i !== taskIndex),
            };
          }
          return list;
        });
        return { dailyTaskLists: updatedLists };
      }),
  },
});

const useMainStore = create<MainState>()(devtools(mainStore, { name: "MainPage Store" }));

export const changeDateBefore = () => useMainStore.getState().actions.changeDateBefore();
export const changeDateAfter = () => useMainStore.getState().actions.changeDateAfter();
export const setStandardDate = () => useMainStore.getState().actions.setStandardDate();

export default useMainStore;
