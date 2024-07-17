import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface Schedule {
  userId?: string;
  title: string;
  scheduleLists: string[];
}

interface ScheduleStore {
  schedules: Schedule[];
  addSchedule: (newSchedule: Schedule) => void;
  updateSchedule: (index: number, updateSchedule: Schedule) => void;
  removeSchedule: (index: number) => void;
}

const scheduleStore: StateCreator<ScheduleStore> = (set) => ({
  schedules: [
    {
      title: "2024-07-01",
      scheduleLists: ["일1", "일2"],
    },
    {
      title: "2024-07-02",
      scheduleLists: ["일1", "일2"],
    },
  ],
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
});

const useScheduleStore = create<ScheduleStore>()(devtools(scheduleStore));

export default useScheduleStore;
