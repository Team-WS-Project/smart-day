import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  body,
  closeButton,
  customCalendar,
  header,
  modalWindow,
  okButton,
  title,
  wrapper,
} from "./DatepickerModal.css";
import { useState } from "react";
import { ko } from "date-fns/locale";
import { FiX } from "react-icons/fi";

const DatepickerModal = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>날짜 선택</div>
          <FiX className={closeButton} />
        </div>

        <div className={body}>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              console.log(date);
            }}
            inline
            locale={ko}
            monthsShown={1}
            dateFormat="YYYY-MM-dd"
            dateFormatCalendar="YYYY년 MMMM"
            className={customCalendar}
          />
        </div>
        <div className={okButton}>확인</div>
      </div>
    </div>
  );
};

export default DatepickerModal;
