export default function Calendar(props) {
  const { today } = props;
  function thisMonth() {
    const date = new Date(today);
    const month = date.getMonth() + 1;

    switch (month) {
      case 1:
        return "January";

      case 2:
        return "February";

      case 3:
        return "March";

      case 4:
        return "April";

      case 5:
        return "May";

      case 6:
        return "June";

      case 7:
        return "July";

      case 8:
        return "August";

      case 9:
        return "September";

      case 10:
        return "October";

      case 11:
        return "November";

      case 12:
        return "December";
    }
  }
  return (
    <div className="calendarContainer">
      <div className="goodMorning">Good morning Jhonatan!</div>
      <div className="calendarDiv">
        &lt; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img className="calendar" src="src\assets\calendar.png" />
        &nbsp;&nbsp;&nbsp;&nbsp; {thisMonth()}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &gt;
      </div>
    </div>
  );
}
