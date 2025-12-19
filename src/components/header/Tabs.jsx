import dash from "../../assets/dashboards.png";

export default function Tabs(props) {
  const { setDisplay } = props;

  const tabs = ["Dashboard", "Transactions", "Category", "Analytics"];

  return (
    <>
      {tabs.map((tab, index) => {
        if (tab === "Dashboard") {
          return (
            <div onClick={() => setDisplay("All")} key={index} className="tab">
              <img className="dashBoardIcon" src={dash} /> {tab}
            </div>
          );
        } else {
          return (
            <div key={index} className="tab">
              {tab}
            </div>
          );
        }
      })}
    </>
  );
}
