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
import DailyScheduleContainer from "../../components/PageComponents/DailyScheduleContainer/DailyScheduleContainer";
import Header from "../../components/PageComponents/Header/Header";
import Footer from "../../components/PageComponents/Footer/Footer";

const SchedulePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={pageContainer}>
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
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => setStartDate(date)}
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
