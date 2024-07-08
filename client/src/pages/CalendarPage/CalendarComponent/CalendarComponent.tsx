import { FC, useState } from "react";
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
  monthText,
  seeAllSchedules,
  textArea,
  todo,
  todolistContainer,
  todolistDetail,
  todolistPannel,
  todoTitle,
} from "./CalendarComponent.css";
import { useNavigate } from "react-router-dom";

const CalendarComponent: FC = () => {
  const [value, setValue] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // 확인용 데이터
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
    true,
    false,
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

  let month = value.getMonth();

  const onChange = (nextValue: Date) => {
    setValue(nextValue);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && date.getMonth() === month && date.getDate() >= 1 && date.getDate() <= 30) {
      const index = date.getDate() - 1;
      if (isHaveTask[index]) {
        return "have-task";
      }
    }
    return "default";
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
          <div>오늘은 날씨가 weather이므로, textObj 하시는건 어때요?</div>
        </div>
        <div className={logoAreaRight}>
          <div className={seeAllSchedules} onClick={gotoSchedulePage}>
            전체 일정 보기
          </div>
          <div className={iconArea}>
            <div className={monthText}>{month + 1}</div>
            <div className={iconStyle}>
              <BsCalendar4 />
            </div>
          </div>
        </div>
      </div>
      <div className={calendarContainer}>
        <Calendar
          className="my-calendar"
          tileClassName={tileClassName}
          onChange={onChange}
          value={value}
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
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
            .<br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
