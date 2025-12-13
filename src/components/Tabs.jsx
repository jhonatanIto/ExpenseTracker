export default function Tabs() {
  const tabs = ["Dashboard", "Transactions", "Category", "Analytics"];

  return (
    <>
      {tabs.map((tab, index) => {
        if (tab === "Dashboard") {
          return (
            <div key={index} className="tab">
              <img className="dashBoardIcon" src="src\assets\dashboards.png" />{" "}
              {tab}
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
