import dash from "../../../assets/dashboards.png";
import { Link } from "react-router-dom";

export default function Tabs(props) {
  const { setDisplay } = props;

  const tabs = ["Dashboard", "Compound Interest Calculator"];

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
        } else if (tab === "Compound Interest Calculator") {
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
