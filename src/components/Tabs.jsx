export default function Tabs() {
  const tabs = ["Dashboard", "Transactions", "Category", "Analytics"];

  return (
    <>
      {tabs.map((tab) => {
        if (tab === "Dashboard") {
          return (
            <div className="tab">
              <img className="dashBoardIcon" src="src\assets\dashboards.png" />{" "}
              {tab}
            </div>
          );
        } else {
          return <div className="tab">{tab}</div>;
        }
      })}
    </>
  );
}
