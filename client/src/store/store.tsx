import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type ModalType =
  | "datepickerModal"
  | "dayModal"
  | "locationModal"
  | "loggerModal"
  | "loginModal"
  | "registerModal"
  | "taskModal"
  | "todoScheduleModal"
  | "userEditModal";
interface ModalState {
  datepickerModal: boolean;
  dayModal: boolean;
  locationModal: boolean;
  loggerModal: boolean;
  loginModal: boolean;
  registerModal: boolean;
  taskModal: boolean;
  todoScheduleModal: boolean;
  selectedTodoScheduleId: number | null;
  userEditModal: boolean;

  actions: {
    changeModalState: (type: ModalType) => void;
  };
}

const modalStore: StateCreator<ModalState> = (set) => ({
  datepickerModal: false,
  dayModal: false,
  locationModal: false,
  loggerModal: false,
  loginModal: false,
  registerModal: false,
  taskModal: false,
  todoScheduleModal: false,
  selectedTodoScheduleId: null,
  userEditModal: false,
  actions: {
    changeModalState: (type) => {
      set((state) => ({ ...state, [type]: !state[type] }));
    },
  },
});

const useModalStore = create<ModalState>()(devtools(modalStore, { name: "Modal Store" }));

export const toggleDatepickerModal = () => useModalStore.getState().actions.changeModalState("datepickerModal");
export const toggleDayModal = () => useModalStore.getState().actions.changeModalState("dayModal");
export const toggleLocationModal = () => useModalStore.getState().actions.changeModalState("locationModal");
export const toggleLoggerModal = () => useModalStore.getState().actions.changeModalState("loggerModal");
export const toggleLoginModal = () => useModalStore.getState().actions.changeModalState("loginModal");
export const toggleRegisterModal = () => useModalStore.getState().actions.changeModalState("registerModal");
export const toggleTaskModal = () => useModalStore.getState().actions.changeModalState("taskModal");
export const toggleTodoScheduleModal = () => useModalStore.getState().actions.changeModalState("todoScheduleModal");
export const toggleUserEditModal = () => useModalStore.getState().actions.changeModalState("userEditModal");

export default useModalStore;
