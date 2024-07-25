import { appContainer } from "../../App.css";
import CalendarComponent from "./CalendarComponent/CalendarComponent";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";
import { calendarPageBody } from "./CalendarPage.css";
import LocationModal from "../../components/ModalComponents/LocationModal/LocationModal";
import useModalStore from "../../store/modalStore";
import TaskModal from "../../components/ModalComponents/TaskModal/TaskModal";
import DayModal from "../../components/ModalComponents/DayModal/DayModal";
import TodoScheduleModal from "../../components/ModalComponents/TodoScheduleModal/TodoScheduleModal";

const CalendarPage = () => {
  const { taskModal, locationModal, dayModal, todoScheduleModal } = useModalStore();

  return (
    <div className={appContainer}>
      {locationModal && <LocationModal />}
      {dayModal && <DayModal />}
      {taskModal && <TaskModal />}
      {todoScheduleModal && <TodoScheduleModal />}
      <Header />
      <div className={calendarPageBody}>
        <CalendarComponent />
      </div>
      <Footer />
    </div>
  );
};

export default CalendarPage;
