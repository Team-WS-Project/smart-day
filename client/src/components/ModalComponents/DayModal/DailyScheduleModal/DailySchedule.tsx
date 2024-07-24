import { dailySchedule, dailyScheduleContent, dailyScheduleTitle } from "./DailySchedule.css";
import { toggleTaskModal } from "../../../../store/modalStore";
import { DailySchedule } from "../../../../store/dayStore";

const DaySchedule = ({ start_time, end_time, title }: DailySchedule) => {
  return (
    <div className={dailySchedule} onClick={toggleTaskModal}>
      <div className={dailyScheduleTitle}>
        {start_time} ~ {end_time}
      </div>
      <div className={dailyScheduleContent}>{title}</div>
    </div>
  );
};

export default DaySchedule;
