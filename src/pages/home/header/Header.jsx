import DarkButton from "./DarkButton";
import Tabs from "./Tabs";
import logo from "../../../assets/dollar.png";
import profile from "../../../assets/6681204.png";
import menuMob from "../../../assets/menu.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contex/UserContext";

export default function Header(props) {
  const [displayMobile, setDisplayMobile] = useState("none");

  const { user } = useContext(UserContext);

  const nav = useNavigate();
  return (
    <div className="header">
      <div className="headerLeft">
        <img
          onClick={() => {
            displayMobile === "none"
              ? setDisplayMobile("flex")
              : setDisplayMobile("none");
          }}
          className="menuMob"
          src={menuMob}
        />
        <img className="pig" src={logo} />
        <div className="tabsContainer">
          <Tabs {...props} />
        </div>
      </div>

      <div className="rightSideHeader">
        {/* <DarkButton /> */}
        <div>
          <img
            onClick={() => {
              !user ? nav("/login") : nav("/profile");
            }}
            className="profileContainer"
            src={user ? user.picture : profile}
          />
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
      </div>
    </div>
  );
}
