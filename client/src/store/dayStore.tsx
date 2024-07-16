import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface DailySchedule {
  userId?: string;
  startTime: string;
  endTime: string;
  content: string;
}

interface DailySchedulesStore {
  dailySchedules: DailySchedule[];
  addSchedule: (newSchedule: DailySchedule) => void;
  updateSchedule: (index: number, updateSchedule: DailySchedule) => void;
  removeSchedule: (index: number) => void;
}

const dailyScheduleStore: StateCreator<DailySchedulesStore> = (set) => ({
  dailySchedules: [
    {
      startTime: "09:00",
      endTime: "11:00",
      content: "운동",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      content: "점심",
    },
    {
      startTime: "14:00",
      endTime: "16:00",
      content: "낮잠",
    },
  ],
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
});

const useDailyScheduleStore = create<DailySchedulesStore>()(devtools(dailyScheduleStore));

export default useDailyScheduleStore;
