import { useContext } from "react";
import dash from "../../../assets/dashboards.png";
import { Link } from "react-router-dom";
import { CardsContext } from "../../contex/CardsContex";

export default function Tabs() {
  const { setDisplay } = useContext(CardsContext);

  const tabs = ["Dashboard", "C.I.Simulation", "USD/JPY"];

  return (
    <>
      {tabs.map((tab, index) => {
        if (tab === "Dashboard") {
          return (
            <div key={index}>
              <Link to="/">
                <button onClick={() => setDisplay("All")} className="tab">
                  <img className="dashBoardIcon" src={dash} /> {tab}
                </button>
              </Link>
            </div>
          );
        } else if (tab === "C.I.Simulation") {
          return (
            <div key={index}>
              <Link to="/simulation">
                <button className="tab">{tab}</button>
              </Link>
            </div>
          );
        } else if (tab === "USD/JPY") {
          return (
            <div key={index}>
              <Link to="/converter">
                <button className="tab">{tab}</button>
              </Link>
            </div>
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
