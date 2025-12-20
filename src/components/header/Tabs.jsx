import dash from "../../assets/dashboards.png";

export default function Tabs(props) {
  const { setDisplay } = props;

  const tabs = ["Dashboard", "Compound Interest Calculator (soon)"];

  return (
    <>
      {tabs.map((tab, index) => {
        if (tab === "Dashboard") {
          return (
            <button
              onClick={() => setDisplay("All")}
              key={index}
              className="tab"
            >
              <img className="dashBoardIcon" src={dash} /> {tab}
            </button>
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
