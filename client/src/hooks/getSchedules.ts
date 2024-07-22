import { useEffect } from "react";
import useScheduleStore, { Schedule } from "../store/scheduleStore";
import getSchedules from "../utils/getSchedules";

const useFetchSchedules = (startDate: Date, endDate: Date) => {
  const { addSchedule, clearSchedule } = useScheduleStore();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        clearSchedule();
        getSchedules.defaults.params.start = startDate.toISOString().slice(0, 10);
        getSchedules.defaults.params.end = endDate.toISOString().slice(0, 10);
        const response = await getSchedules.get("");

        response.data.forEach((item: Schedule) => {
          addSchedule(item);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchedules();
  }, [clearSchedule, addSchedule, startDate, endDate]);

  return null;
};

export default useFetchSchedules;
