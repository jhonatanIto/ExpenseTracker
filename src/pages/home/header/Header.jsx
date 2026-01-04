import DarkButton from "./DarkButton";
import Tabs from "./Tabs";
import logo from "../../../assets/dollar.png";
import back from "../../../assets/back.png";
import profile from "../../../assets/6681204.png";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      <div style={{ display: displayMobile }} className="mobileMenu">
        <Link to="/">
          <div onClick={() => setDisplayMobile("none")} className="mobileTab">
            dashboard
          </div>
        </Link>
        <Link to="/simulation">
          <div onClick={() => setDisplayMobile("none")} className="mobileTab">
            simulation
          </div>
        </Link>
        <Link to="/converter">
          <div onClick={() => setDisplayMobile("none")} className="mobileTab">
            USD/JPY
          </div>
        </Link>
        <img
          onClick={() => setDisplayMobile("none")}
          className="backIcon"
          src={back}
        />
      </div>
    </div>
  );
}
