import { useState } from "react";
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
  todo,
  todolistContainer,
  todolistDetail,
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

const CalendarComponent = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
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

  // 확인용 임시 데이터 -> Todo: fetch(month => { return isHaveTask; }) (@II-122)
  const isHaveTask = [
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
    false,
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

  const onChange = ({activeStartDate}) => {
    setActiveDate(activeStartDate);
    // Todo: fetch(month => { isHaveTask = newIsHaveTask; }) 작업 필요 (@II-122)
  };

  const logoTextCenter = () => {
    if(activeDate.getMonth() + 1 < 10) {
      return monthTextSingle;
    } else {
      return monthTextDouble;
    }
  };

  const formatDay = (locale, date) => {
    return date.getDate().toString();
  };

  const tileClassName = ({date, view}) => {
    if (view === "month" && date.getMonth() === activeDate.getMonth() && date.getDate() >= 1 && date.getDate() <= 31) {
      const index = date.getDate() - 1;
      if (isHaveTask[index]) {
        return "have-task";
      } 
      return "default";
    }
    return "out-of-month";
  };

  const tileContent = ({date, view}) => {
    const today = new Date();
    if (view === "month" && date.getMonth() === today.getMonth()) {
      if(today.getDate() <= date.getDate() && date.getDate() < today.getDate() + 7){
        return (<div className={iconArea}>{weatherIcons[Math.floor(Math.random() * 9)]}</div>);
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
            <div className={todo}>
              <input type="checkbox" onChange={handleCheckboxChange} />
              <text
                style={{
                  textDecoration: isChecked ? "line-through" : "none",
                }}
                onClick={() => alert("투두리스트 모달 열기")}
              >
                07/02
              </text>
            </div>
            <div className={todolistDetail}>
              <text
                style={{
                  textDecoration: isChecked ? "line-through" : "none",
                  padding: "3%",
                }}
              >
                투두리스트 디테일
              </text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
