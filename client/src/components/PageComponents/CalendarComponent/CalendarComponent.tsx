import { FC, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import "./Calendar.css";

const CalendarComponent : FC = () => {
    const [value, setValue] = useState(new Date());

    const onChange = (nextValue: Date) => {
        setValue(nextValue);
    };

    const calendarClick = (value: Date) => {
        // onClicDay
    };

    return (
        <div>
            <div>
                <div>
                    <Calendar
                        onChange={onChange}
                        value={value}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
