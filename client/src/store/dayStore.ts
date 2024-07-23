import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface DailySchedule {
  scheduleId?: string;
  title: string;
  detail?: string;
  startDate?: Date;
  endDate?: Date;
  startTime: string;
  endTime: string;
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
  dailySchedules: [
    {
      startTime: "09:00",
      endTime: "11:00",
      title: "운동",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      title: "점심",
    },
    {
      startTime: "14:00",
      endTime: "16:00",
      title: "낮잠",
    },
    {
      startTime: "15:00",
      endTime: "18:00",
      title: "중간잠",
    },
    {
      startTime: "09:00",
      endTime: "11:00",
      title: "운동",
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      title: "점심",
    },
    {
      startTime: "14:00",
      endTime: "16:00",
      title: "낮잠",
    },
    {
      startTime: "15:00",
      endTime: "18:00",
      title: "중간잠",
    },
  ],
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
