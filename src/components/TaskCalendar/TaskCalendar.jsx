import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const TaskCalendar = ({
  selectedDate,
  onChange,
  withDeadlinePrefix = true,
}) => {
  const deadlineText = selectedDate ? format(selectedDate, "dd.MM.yy") : "";

  return (
    <div className="calendar calendar--picker">
      <p className="calendar__ttl subttl">Даты</p>
      <div className="calendar__block">
        <DatePicker
          inline
          locale="ru"
          selected={selectedDate}
          onChange={onChange}
          calendarClassName="task-datepicker"
          formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 2)}
        />
        <div className="calendar__period">
          <p className="calendar__p date-end">
            {withDeadlinePrefix
              ? "Срок исполнения: "
              : "Выберите срок исполнения "}
            <span className="date-control">{deadlineText}</span>
            {withDeadlinePrefix ? "" : "."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
