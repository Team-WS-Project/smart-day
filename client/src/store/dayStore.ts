import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface DailySchedule {
  id: number;
  title: string;
  detail?: string;
  start_date?: Date;
  end_date?: Date;
  start_time: string;
  end_time: string;
}

interface DailySchedulesStore {
  date: Date;
  dailySchedules: DailySchedule[];
  actions: {
    setDate: (date: Date) => void;
    addSchedule: (newSchedule: DailySchedule) => void;
    updateSchedule: (index: number, updateSchedule: DailySchedule) => void;
    removeSchedule: (index: number) => void;
    clearSchedule: () => void;
  };
}

const dailyScheduleStore: StateCreator<DailySchedulesStore> = (set) => ({
  date: new Date(),
  dailySchedules: [],
  actions: {
    setDate: (date: Date) => set(() => ({ date })),
    addSchedule: (newSchedule: DailySchedule) =>
      set((state) => ({
        dailySchedules: [...state.dailySchedules, newSchedule],
      })),
    updateSchedule: (index: number, updatedSchedule: DailySchedule) =>
      set((state) => ({
        dailySchedules: state.dailySchedules.map((schedule, i) => (i === index ? updatedSchedule : schedule)),
      })),
    removeSchedule: (index: number) =>
      set((state) => ({
        dailySchedules: state.dailySchedules.filter((_, i) => i !== index),
      })),
    clearSchedule: () =>
      set(() => ({
        dailySchedules: [],
      })),
  },
});

const useDailyScheduleStore = create<DailySchedulesStore>()(
  devtools(dailyScheduleStore, { name: "DailyScheduleStore" }),
);

export default useDailyScheduleStore;
