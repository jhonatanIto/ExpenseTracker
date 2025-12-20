import DarkButton from "./DarkButton";
import Tabs from "./Tabs";
import logo from "../../../assets/dollar.png";
import profile from "../../../assets/6681204.png";

export default function Header(props) {
  return (
    <div className="header">
      <div className="tabsContainer">
        <div>
          <img className="pig" src={logo} alt="" />
        </div>
        <Tabs {...props} />
      </div>

      <div className="rightSideHeader">
        <DarkButton />
        <div>
          <img className="profileContainer" src={profile} />
        </div>
      </div>
    </div>
  );
}
