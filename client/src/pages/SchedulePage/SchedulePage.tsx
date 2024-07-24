import { useEffect, useRef, useState } from "react";
import {
  dateContainer,
  datePickerContainer,
  dateSettingRow,
  pageContainer,
  schedulePageContainer,
  schedulePageTitle,
  schedulersContainer,
  wave,
} from "./SchedulePage.css";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DailyScheduleContainer from "./DailyScheduleContainer/DailyScheduleContainer";
import DayModal from "../../components/ModalComponents/DayModal/DayModal";
import useModalStore from "../../store/modalStore";
import LoginModal from "../../components/ModalComponents/LoginModal/LoginModal";
import RegisterModal from "../../components/ModalComponents/RegisterModal/RegisterModal";
import useScheduleStore, { Schedule } from "../../store/scheduleStore";
import { getSchedulesAPI } from "../../apis/getSchedulesAPI";
import Header from "../../components/PageComponents/Header/Header";
import Footer from "../../components/PageComponents/Footer/Footer";
import LocationModal from "../../components/ModalComponents/LocationModal/LocationModal";
import RegisterEditModal from "../../components/ModalComponents/RegisterEditModal/RegisterEditModal";
import CheckPasswordModal from "../../components/ModalComponents/RegisterEditModal/CheckPasswordModal/CheckPasswordModal";
import { useUserInfoStore } from "../../store/userInfoStore";

const SchedulePage = () => {
  const hasPageBeenRendered = useRef({ effect: false });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 15);
    return date;
  });
  const schedules = useScheduleStore((state) => state.schedules);
  const actions = useScheduleStore((state) => state.actions);
  const { loginModal, userEditModal, dayModal, locationModal, registerModal, pwCheckModal } = useModalStore();
  const userId = useUserInfoStore((state) => state.userId);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        actions.clearSchedule();
        const data = await getSchedulesAPI(startDate, endDate);
        data.forEach((item: Schedule) => {
          actions.addSchedule(item);
        });
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      }
    };
    if (hasPageBeenRendered.current["effect"]) {
      fetchSchedules();
    }
    hasPageBeenRendered.current["effect"] = true;
  }, [startDate, endDate, actions, userId]);

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
    }
  };

  return (
    <div className={pageContainer}>
      {dayModal && <DayModal />}
      {loginModal && <LoginModal />}
      {registerModal && <RegisterModal />}
      {locationModal && <LocationModal />}
      {userEditModal && <RegisterEditModal />}
      {pwCheckModal && <CheckPasswordModal />}
      <Header />
      <div className={schedulePageContainer}>
        <div className={schedulePageTitle}>전체 일정</div>

        <div className={dateSettingRow}>
          <div className={dateContainer}>
            <DatePicker
              showIcon
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => handleStartDateChange(date)}
              icon={<FiCalendar />}
              className={datePickerContainer}
              maxDate={endDate}
            />
          </div>

          <div className={wave}>~</div>
          <div className={dateContainer}>
            <DatePicker
              showIcon
              selected={endDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => handleEndDateChange(date)}
              icon={<FiCalendar />}
              className={datePickerContainer}
              minDate={startDate}
            />
          </div>
        </div>

        <div className={schedulersContainer}>
          {schedules.map((schedule, index) => (
            <DailyScheduleContainer key={index} start_date={schedule.start_date} titles={schedule.titles} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePage;
