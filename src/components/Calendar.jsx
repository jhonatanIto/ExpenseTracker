import { useEffect } from "react";
import calendar from "../assets/calendar.png";

export default function Calendar(props) {
  const { today, setnichi, year, month } = props;

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
    setnichi(({ month, year, day }) => {
      let newMonth = month + direction;
      let newYear = year;

      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      return { month: newMonth, year: newYear, day };
    });
  }
  useEffect(() => {
    if (!today) return;
    const date = new Date(today);
    const currMonth = date.getMonth();
    const currYear = date.getFullYear();
    const currDay = date.getDate();

    setnichi({ month: currMonth, year: currYear, day: currDay });
  }, [today]);

  return (
    <div className="calendarContainer">
      <div className="goodMorning">Good morning!</div>
      <div className="calendarDiv">
        <button className="calendarArrow" onClick={() => changeMonth(-1)}>
          {" "}
          &lt;{" "}
        </button>
        <button className="flex ">
          {" "}
          <img className="calendar" src={calendar} />
          <div className="calendarMonth">&nbsp;&nbsp; {monthNames[month]}</div>
          <div className="ml-1.5">{year}</div>
        </button>

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
