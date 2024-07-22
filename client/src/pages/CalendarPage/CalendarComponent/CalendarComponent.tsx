import { act, useEffect, useState } from "react";
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

const CalendarComponent = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const { todolist, isHaveTask } = useCalendarPageStore();
  const { setIsHaveTask, setTodolist } = useCalendarPageStore((state) => state.actions);
  const navigate = useNavigate();

  const weatherIcons = [
    <TiWeatherCloudy />,
    <TiWeatherDownpour />,
    <TiWeatherPartlySunny />,
    <TiWeatherShower />,
    <TiWeatherSnow />,
    <TiWeatherStormy />,
    <TiWeatherSunny />,
    <TiWeatherWindy />,
    <TiWeatherWindyCloudy />,
  ];

  const fetchIsHaveTask = async () => {
    const nowYear = activeDate.getFullYear();
    const nowMonth = activeDate.getMonth();

    try {
      const res = await getIsHaveTask(nowYear, nowMonth);
      console.log(res?.data);
      const updatedIsHaveTask = res?.data; // res.data는 array[0]~[30 or 31] 형태

      // store 업데이트
      setIsHaveTask(updatedIsHaveTask);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTodolist = async () => {
    const nowDate = String(activeDate.getFullYear()) + "-" + activeDate.getMonth();
    const res = await getTodolist(nowDate);
    // console.log(res.data);

    // 아래 코드 수정 필요 -> res.data와 Todo[] interface 비교하여 형식 정해주기
    const newTodoList = res?.data;
    setTodolist(newTodoList);
  };

  useEffect(() => {
    // 확인용 임시 데이터 -> Todo: fetch(month => { return isHaveTask; }) (@II-122)

    // fetchIsHaveTask(nowYear, nowMonth);

    // 아래는 api가 연결 되면 삭제할 코드
    const haveTask = [
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
    ];
    setIsHaveTask(haveTask);
  }, [setIsHaveTask]);

  const onChange = ({ activeStartDate }) => {
    setActiveDate(activeStartDate);
    // Todo: fetch(month => { isHaveTask = newIsHaveTask; }) 작업 필요 (@II-122)
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

  const tileClassName = ({ date, view }) => {
    if (view === "month" && date.getMonth() === activeDate.getMonth() && date.getDate() >= 1 && date.getDate() <= 31) {
      const index = date.getDate() - 1;
      if (isHaveTask[index]) {
        return "have-task";
      }
      return "default";
    }
    return "out-of-month";
  };

  const tileContent = ({ date, view }) => {
    const today = new Date();
    if (view === "month" && date.getMonth() === today.getMonth()) {
      if (today.getDate() <= date.getDate() && date.getDate() < today.getDate() + 7) {
        return <div className={iconArea}>{weatherIcons[Math.floor(Math.random() * 9)]}</div>;
      }
    }
  };

  const gotoSchedulePage = () => {
    navigate("/schedule");
  };

  return (
    <div>
      <div className={logoArea}>
        <div className={textArea}>
          <div>
            현재 지역은 location 입니다.
            <text className={locationChangeText} onClick={() => alert("위치 변경 모달 열기")}>
              위치 변경
            </text>
          </div>
          <div>" .................. 하드 코딩 된 데이터 ................. "</div>
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
          tileClassName={tileClassName}
          tileContent={tileContent}
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
