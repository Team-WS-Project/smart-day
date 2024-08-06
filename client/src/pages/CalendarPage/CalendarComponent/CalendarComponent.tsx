import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsCalendar4 } from "react-icons/bs";
import "./Calendar.css";
import {
  calendarContainer,
  iconArea,
  iconStyle,
  locationChangeText,
  logoArea,
  logoAreaRight,
  monthTextSingle,
  monthTextDouble,
  seeAllSchedules,
  textArea,
  todolistContainer,
  todolistPannel,
  todoTitle,
} from "./CalendarComponent.css";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindy,
  TiWeatherWindyCloudy,
} from "react-icons/ti";
import { TbCloudQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useCalendarPageStore from "../../../store/calendarStore";
import Todo from "./Todo/Todo";
import { getIsHaveTask, getTodolist } from "../../../apis/calenderPageAPI";
import dayjs from "dayjs";
import useModalStore, { toggleDayModal, toggleLocationModal } from "../../../store/modalStore";
import { useUserInfoStore } from "../../../store/userInfoStore";
import useDailyScheduleStore from "../../../store/dayStore";
import { useWeatherStore } from "../../../store/weatherStore";
import { useFetchThreeDayWeathers } from "../../../apis/setThreeDayWeathersAPI";
import useMainStore from "../../../store/mainStore";

const CalendarComponent = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const { currentLocation } = useUserInfoStore();
  const { todolist, isHaveTask } = useCalendarPageStore();
  const { setIsHaveTask, setTodolist } = useCalendarPageStore((state) => state.actions);
  const actions = useDailyScheduleStore((state) => state.actions);
  const { taskModal, todoScheduleModal, dayModal } = useModalStore();
  const weatherData = useWeatherStore((state) => state.weatherData);
  const fetchWeather = useFetchThreeDayWeathers();
  const { standardDate } = useMainStore();

  const navigate = useNavigate();

  const weatherIcons = [
    <TiWeatherDownpour />,
    <TiWeatherSunny />,
    <TiWeatherWindyCloudy />,
    <TiWeatherCloudy />,
    <TiWeatherPartlySunny />,
    <TiWeatherSnow />,
    <TiWeatherStormy />,
    <TiWeatherWindy />,
    <TiWeatherShower />,
  ];

  const fetchIsHaveTask = async () => {
    const nowYear = String(dayjs(activeDate).format("YYYY"));
    const nowMonth = String(dayjs(activeDate).format("MM"));

    try {
      const res = await getIsHaveTask(nowYear, nowMonth);
      const updatedIsHaveTask = res?.data.monthArray; // res.data는 array[0]~[30 or 31] 형태

      setIsHaveTask(updatedIsHaveTask);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  interface Todo {
    id: number;
    due_date: string;
    completed: number;
    title: string;
  }

  const fetchTodolist = async () => {
    const nowDate = String(dayjs(activeDate).format("YYYY-MM"));

    const res = await getTodolist(nowDate);

    const newTodoList = res?.data.map((todo: Todo) => {
      return {
        id: todo.id,
        dueDate: todo.due_date,
        isDone: todo.completed === 0 ? false : true,
        title: todo.title,
        description: "",
      };
    });
    setTodolist(newTodoList);
  };

  useEffect(() => {
    fetchIsHaveTask();
    fetchTodolist();
  }, [activeDate, taskModal, todoScheduleModal, dayModal, weatherData]);

  useEffect(() => {
    fetchWeather(currentLocation, standardDate);
  }, [currentLocation]);

  const onChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setActiveDate(activeStartDate);
      fetchIsHaveTask();
    }
  };

  const logoTextCenter = () => {
    if (activeDate.getMonth() + 1 < 10) {
      return monthTextSingle;
    } else {
      return monthTextDouble;
    }
  };

  const formatDay = (locale: string | undefined, date: Date) => {
    return date.toLocaleDateString(locale);
  };

  // error 해결 필요
  const haveTaskOrNot = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && date.getMonth() === activeDate.getMonth() && date.getDate() >= 1 && date.getDate() <= 31) {
      const index = date.getDate() - 1;
      if (isHaveTask[index] === true) {
        return "have-task";
      }
      return "default";
    }
    return "out-of-month";
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const today = new Date();
    const formattedToday = dayjs(today).format("YYYY-MM-DD");
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    if (
      view === "month" &&
      date.getMonth() === today.getMonth() &&
      date.getMonth() === activeDate.getMonth() &&
      date.getDate() >= 1 &&
      date.getDate() <= 31
    ) {
      if (formattedDate === formattedToday) {
        return (
          <div className={iconArea}>
            {weatherData && typeof weatherData[formattedDate] !== "undefined" ? (
              weatherIcons[weatherData[formattedDate]]
            ) : (
              <TbCloudQuestion />
            )}
          </div>
        );
      } else if (formattedDate === dayjs(today).add(1, "day").format("YYYY-MM-DD")) {
        return (
          <div className={iconArea}>
            {weatherData && typeof weatherData[formattedDate] !== "undefined" ? (
              weatherIcons[weatherData[formattedDate]]
            ) : (
              <TbCloudQuestion />
            )}
          </div>
        );
      } else if (formattedDate === dayjs(today).add(2, "day").format("YYYY-MM-DD")) {
        return (
          <div className={iconArea}>
            {weatherData && typeof weatherData[formattedDate] !== "undefined" ? (
              weatherIcons[weatherData[formattedDate]]
            ) : (
              <TbCloudQuestion />
            )}
          </div>
        );
      }
    }
  };

  const gotoSchedulePage = () => {
    navigate("/schedule");
  };

  const clickLocationChangeText = () => {
    toggleLocationModal();
  };

  const clickDay = (nowDate: Date) => {
    actions.setDate(nowDate);
    toggleDayModal();
  };

  return (
    <div>
      <div className={logoArea}>
        <div className={textArea}>
          <div>
            현재 지역은 {currentLocation ? currentLocation : "서울시"} 입니다.
            <text className={locationChangeText} onClick={clickLocationChangeText}>
              위치 변경
            </text>
          </div>
        </div>
        <div className={logoAreaRight}>
          <div className={seeAllSchedules} onClick={gotoSchedulePage}>
            전체 일정 보기
          </div>
          <div className={iconArea}>
            <div className={logoTextCenter()}>{activeDate.getMonth() + 1}</div>
            <div className={iconStyle}>
              <BsCalendar4 />
            </div>
          </div>
        </div>
      </div>
      <div className={calendarContainer}>
        <Calendar
          className="my-calendar"
          formatDay={formatDay}
          tileClassName={haveTaskOrNot}
          tileContent={tileContent}
          onClickDay={clickDay}
          onActiveStartDateChange={onChange}
        />
        <div className={todolistContainer}>
          <div className={todoTitle}>
            {"<"} Todo List {">"}
          </div>
          <div className={todolistPannel}>
            {todolist
              ? todolist.map((item) => (
                  <Todo id={item.id} dueDate={item.dueDate} isCheck={item.isDone} title={item.title} />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
