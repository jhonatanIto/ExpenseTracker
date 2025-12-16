import { useEffect, useState } from "react";
import calendar from "../assets/calendar.png";

export default function Calendar(props) {
  const { today, month, setMonth } = props;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function changeMonth(direction) {
    setMonth((prev) => {
      let newMonth = prev + direction;

      if (newMonth < 0) newMonth = 11;
      if (newMonth > 11) newMonth = 0;

      return newMonth;
    });
  }
  useEffect(() => {
    if (!today) return;
    const date = new Date(today);
    const currMonth = date.getMonth();
    setMonth(currMonth);
  }, [today]);

  return (
    <div className="calendarContainer">
      <div className="goodMorning">Good morning Jhonatan!</div>
      <div className="calendarDiv">
        <button className="calendarArrow" onClick={() => changeMonth(-1)}>
          {" "}
          &lt;{" "}
        </button>
        <div className="flex">
          {" "}
          <img className="calendar" src={calendar} />
          <div className="calendarMonth">&nbsp;&nbsp; {monthNames[month]}</div>
        </div>

        <button
          className="calendarArrow"
          onClick={() => {
            changeMonth(1);
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
