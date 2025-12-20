import { useContext } from "react";
import dash from "../../../assets/dashboards.png";
import { Link } from "react-router-dom";
import { CardsContext } from "../../contex/CardsContex";

export default function Tabs() {
  const { setDisplay } = useContext(CardsContext);

  const tabs = ["Dashboard", "C.I.Calculator"];

  return (
    <>
      {tabs.map((tab, index) => {
        if (tab === "Dashboard") {
          return (
            <Link to="/">
              <button
                onClick={() => setDisplay("All")}
                key={index}
                className="tab"
              >
                <img className="dashBoardIcon" src={dash} /> {tab}
              </button>
            </Link>
          );
        } else if (tab === "C.I.Calculator") {
          return (
            <Link to="/calculator">
              <button key={index} className="tab">
                {tab}
              </button>
            </Link>
          );
        } else {
          return (
            <button key={index} className="tab">
              {tab}
            </button>
          );
        }
      })}
    </>
  );
}
