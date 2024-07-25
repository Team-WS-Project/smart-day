import { dailySchedule, dailyScheduleContent, dailyScheduleTitle } from "./DailySchedule.css";
import { toggleTaskModal } from "../../../../store/modalStore";
import { DailySchedule } from "../../../../store/dayStore";
import useTaskStore from "../../../../store/taskStore";
import { useUserInfoStore } from "../../../../store/userInfoStore";
import dayjs from "dayjs";

const DaySchedule = ({ id, title, detail, start_date, end_date, start_time, end_time }: DailySchedule) => {
  const setIsNewTask = useTaskStore((state) => state.setIsNewTask);
  const { initializeSelectedDate } = useUserInfoStore((state) => state.actions);
  const updateTask = useTaskStore((state) => state.updateTask);

  const clickTaskDiv = () => {
    const nowTask = {
      taskId: id,
      taskIndex: 0,
      listIndex: 0,
      date: dayjs(start_date).format("YYYY-MM-DD"),
      startTime: start_time,
      endTime: end_time,
      title: detail ? detail : title,
      detail: detail ? detail : title,
    };
    initializeSelectedDate();
    setIsNewTask(false);
    updateTask(nowTask);
    toggleTaskModal();
  };

  return (
    <div className={dailySchedule} onClick={clickTaskDiv}>
      <div className={dailyScheduleTitle}>
        {start_time} ~ {end_time}
      </div>
      <div className={dailyScheduleContent}>{title}</div>
    </div>
  );
};

export default DaySchedule;
