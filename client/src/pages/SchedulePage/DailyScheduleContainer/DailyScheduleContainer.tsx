import { dailyContainer, dateTitle, scheduleList } from "./DailyScheduleContainer.css";
import { toggleDayModal } from "../../../store/modalStore";
import { Schedule } from "../../../store/scheduleStore";
import useDailyScheduleStore from "../../../store/dayStore";

const DailyScheduleContainer = ({ start_date, titles }: Schedule) => {
  const actions = useDailyScheduleStore((state) => state.actions);

  const handleClick = () => {
    const date = new Date(start_date);
    actions.setDate(date);
    toggleDayModal();
  };

  return (
    <div className={dailyContainer} onClick={handleClick}>
      <div className={dateTitle}>{start_date}</div>
      <div className={scheduleList}>
        <ul>
          {titles.map((schedule, index) => (
            <li key={index}>{schedule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyScheduleContainer;
