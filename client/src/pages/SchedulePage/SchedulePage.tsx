import { useState } from "react";
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
import useModalStore from "../../store/store";
import LoginModal from "../../components/ModalComponents/LoginModal/LoginModal";
import RegisterModal from "../../components/ModalComponents/RegisterModal/RegisterModal";

const SchedulePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { showDayModal } = useModalStore((state) => ({ showDayModal: state.dayModal }));
  const { showLoginModal } = useModalStore((state) => ({ showLoginModal: state.loginModal }));
  const { showRegisterModal } = useModalStore((state) => ({ showRegisterModal: state.registerModal }));

  return (
    <div className={pageContainer}>
      {showDayModal && <DayModal />}
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
      <Header />
      <div className={schedulePageContainer}>
        <div className={schedulePageTitle}>전체 일정</div>

        <div className={dateSettingRow}>
          <div className={dateContainer}>
            <DatePicker
              showIcon
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => setStartDate(date)}
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
              onChange={(date) => setEndDate(date)}
              icon={<FiCalendar />}
              className={datePickerContainer}
            />
          </div>
          <input type="checkbox"></input>
          <div>지난 날짜 일정 표시 off</div>
        </div>

        <div className={schedulersContainer}>
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
          <DailyScheduleContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePage;
