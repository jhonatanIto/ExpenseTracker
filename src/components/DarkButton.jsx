import { useEffect, useState } from "react";
import sun from "../assets/brightness.png";
import moon from "../assets/night-mode.png";

export default function DarkButton() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDark(true);
      document.body.classList.add("darkChange");
    }
  }, []);
  function changeDark() {
    const newDark = !dark;
    setDark(newDark);
    document.body.classList.toggle("darkChange", newDark);
    localStorage.setItem("darkMode", newDark);
  }

  return (
    <div onClick={changeDark} className="darkButtonContainer">
      <i className="darkButtonBall"></i>
      <img className="darkIcon" src={sun} />
      <img className="moonIcon" src={moon} />
    </div>
  );
}
