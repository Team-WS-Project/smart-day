import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface Schedule {
  userId?: string;
  start_date: string;
  titles: string[];
}

interface ScheduleStore {
  schedules: Schedule[];
  actions: {
    addSchedule: (newSchedule: Schedule) => void;
    updateSchedule: (index: number, updateSchedule: Schedule) => void;
    removeSchedule: (index: number) => void;
    clearSchedule: () => void;
  };
}

const scheduleStore: StateCreator<ScheduleStore> = (set) => ({
  schedules: [],
  actions: {
    addSchedule: (newSchedule: Schedule) =>
      set((state) => ({
        schedules: [...state.schedules, newSchedule],
      })),
    updateSchedule: (index: number, updatedSchedule: Schedule) =>
      set((state) => ({
        schedules: state.schedules.map((schedule, i) => (i === index ? updatedSchedule : schedule)),
      })),
    removeSchedule: (index: number) =>
      set((state) => ({
        schedules: state.schedules.filter((_, i) => i !== index),
      })),
    clearSchedule: () =>
      set(() => ({
        schedules: [],
      })),
  },
});

const useScheduleStore = create<ScheduleStore>()(devtools(scheduleStore, { name: "Schedule Store" }));

export default useScheduleStore;
