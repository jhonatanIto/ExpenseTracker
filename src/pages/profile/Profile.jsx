import { useContext } from "react";
import "./profile.css";
import { UserContext } from "../contex/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const nav = useNavigate();
  return (
    <div className="profileBody">
      <div className="profileBoxC">
        <div className="nameLine">
          <div>Name: </div>
          <div>{user?.name}</div>
        </div>
        <div className="nameLine">
          <div>Email: </div>
          <div>{user?.email}</div>
        </div>
        <div className="nameLine">
          <div>Plan: </div>
          <div>{user?.plan}</div>
        </div>
        <button
          onClick={() => {
            logout();
            nav("/");
          }}
          className="logoutButt"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
