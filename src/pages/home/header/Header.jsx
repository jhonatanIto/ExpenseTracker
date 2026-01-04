import DarkButton from "./DarkButton";
import Tabs from "./Tabs";
import logo from "../../../assets/dollar.png";
import profile from "../../../assets/6681204.png";
import { useState } from "react";

export default function Header(props) {
  const [displayMobile, setDisplayMobile] = useState("none");
  return (
    <div className="header">
      <div className="headerLeft">
        <img
          onClick={() => setDisplayMobile("flex")}
          className="menuMob"
          src="src\assets\menu.png"
        />
        <img className="pig" src={logo} />
        <div className="tabsContainer">
          <Tabs {...props} />
        </div>
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
