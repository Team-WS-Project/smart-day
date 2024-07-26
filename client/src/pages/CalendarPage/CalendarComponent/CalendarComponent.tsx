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
import { useNavigate } from "react-router-dom";
import useCalendarPageStore from "../../../store/calendarStore";
import Todo from "./Todo/Todo";
import { getIsHaveTask, getTodolist } from "../../../apis/calenderPageAPI";
import dayjs from "dayjs";
import useModalStore, { toggleDayModal, toggleLocationModal } from "../../../store/modalStore";
import { useUserInfoStore } from "../../../store/userInfoStore";
import useDailyScheduleStore from "../../../store/dayStore";
import { weatherApiFetchTest } from "../../../apis/weatherAPI/weatherAPI";

const CalendarComponent = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const { currentLocation } = useUserInfoStore();
  const { todolist, isHaveTask } = useCalendarPageStore();
  const { setIsHaveTask, setTodolist } = useCalendarPageStore((state) => state.actions);
  const actions = useDailyScheduleStore((state) => state.actions);
  const { taskModal, todoScheduleModal, dayModal } = useModalStore();
  let weatherArray = [];

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

  const fetchTodolist = async () => {
    const nowDate = String(dayjs(activeDate).format("YYYY-MM"));

    const res = await getTodolist(nowDate);

    const newTodoList = res?.data.map((todo) => {
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

  async function fetchweather() {
    try {
      const result = await weatherApiFetchTest(currentLocation); // Promise가 해결될 때까지 기다림
      console.log(result);

      weatherArray = result;
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
  useEffect(() => {
    fetchIsHaveTask();
    fetchTodolist();
  }, [activeDate, taskModal, todoScheduleModal, dayModal]);

  useEffect(() => {
    fetchweather();
  }, [currentLocation]);

  const onChange = ({ activeStartDate }) => {
    setActiveDate(activeStartDate);
    fetchIsHaveTask();
  };

  const logoTextCenter = () => {
    if (activeDate.getMonth() + 1 < 10) {
      return monthTextSingle;
    } else {
      return monthTextDouble;
    }
  };

  const formatDay = (locale, date) => {
    return date.getDate().toString();
  };

  // error 해결 필요
  const haveTaskOrNot = ({ date, view }) => {
    if (view === "month" && date.getMonth() === activeDate.getMonth() && date.getDate() >= 1 && date.getDate() <= 31) {
      const index = date.getDate() - 1;
      if (isHaveTask[index] === true) {
        return "have-task";
      }
      return "default";
    }
    return "out-of-month";
  };

  const tileContent = ({ date, view }) => {
    const today = new Date();
    if (
      view === "month" &&
      date.getMonth() === today.getMonth() &&
      date.getMonth() === activeDate.getMonth() &&
      date.getDate() >= 1 &&
      date.getDate() <= 31
    ) {
      if (date.getDate() === today.getDate()) {
        return <div className={iconArea}>{weatherIcons[0]}</div>;
      } else if (date.getDate() === today.getDate() + 1) {
        return <div className={iconArea}>{weatherIcons[1]}</div>;
      } else if (date.getDate() === today.getDate() + 2) {
        return <div className={iconArea}>{weatherIcons[2]}</div>;
      }
    }
  };

  const gotoSchedulePage = () => {
    navigate("/schedule");
  };

  const clickLocationChangeText = () => {
    toggleLocationModal();
  };

  const clickDay = (nowDate) => {
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
                  <Todo
                    id={item.id}
                    dueDate={item.dueDate}
                    isCheck={item.isDone}
                    title={item.title}
                    description={item.description}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
