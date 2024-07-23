import { useEffect, useState } from "react";
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
import Header from "../../components/PageComponents/Header/Header";
import Footer from "../../components/PageComponents/Footer/Footer";
import DailyScheduleContainer from "./DailyScheduleContainer/DailyScheduleContainer";
import DayModal from "../../components/ModalComponents/DayModal/DayModal";
import useModalStore from "../../store/modalStore";
import LoginModal from "../../components/ModalComponents/LoginModal/LoginModal";
import RegisterModal from "../../components/ModalComponents/RegisterModal/RegisterModal";
import useScheduleStore, { Schedule } from "../../store/scheduleStore";
import { getSchedulesAPI } from "../../apis/getSchedulesAPI";
import { useUserInfoStore } from "../../store/userInfoStore";
import CheckPasswordModal from "../../components/ModalComponents/RegisterEditModal/CheckPasswordModal/CheckPasswordModal";

const SchedulePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 15);
    return date;
  });
  const { showDayModal } = useModalStore((state) => ({ showDayModal: state.dayModal }));
  const { showLoginModal } = useModalStore((state) => ({ showLoginModal: state.loginModal }));
  const { showRegisterModal } = useModalStore((state) => ({ showRegisterModal: state.registerModal }));
  const { showPWCheckModal } = useModalStore((state) => ({ showPWCheckModal: state.pwCheckModal }));
  // const { userEditModal } = useModalStore((state) => ({ pwCheckModal: state.userEditModal }));
  const schedules = useScheduleStore((state) => state.schedules);
  const actions = useScheduleStore((state) => state.actions);
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
    if (userId !== null) {
      fetchSchedules();
    }
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
      {showDayModal && <DayModal />}
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
      {showPWCheckModal && <CheckPasswordModal />}
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
            />
          </div>
          <input type="checkbox"></input>
          <div>지난 날짜 일정 표시 off</div>
        </div>

        <div className={schedulersContainer}>
          {userId !== null ? (
            schedules.map((schedule, index) => (
              <DailyScheduleContainer key={index} start_date={schedule.start_date} titles={schedule.titles} />
            ))
          ) : (
            <h1>일정을 보시려면 로그인을 해주세요</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePage;
