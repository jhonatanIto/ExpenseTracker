import DarkButton from "./DarkButton";
import Tabs from "./Tabs";

export default function Header() {
  return (
    <div className="header">
      <div className="tabsContainer">
        <div>
          <img className="pig" src="src\assets\dollar.png" alt="" />
        </div>
        <Tabs />
      </div>

      <div className="rightSideHeader">
        <DarkButton />
        <div>
          <img className="profileContainer" src="src\assets\6681204.png" />
        </div>
      </div>
    </div>
  );
}
