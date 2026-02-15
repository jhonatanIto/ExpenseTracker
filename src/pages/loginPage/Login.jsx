import { useContext, useState } from "react";
import "./login.css";
import { UserContext } from "../contex/UserContext";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { login } = useContext(UserContext);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = isSignUp ? { name, email, password } : { email, password };
    try {
      if (isSignUp) {
        const res = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
          alert(data.message);
          return;
        }

        alert("user Created");
        setEmail("");
        setPassword("");
        setName("");
      } else {
        try {
          const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
          const data = await res.json();

          if (!res.ok) {
            console.error(data.message);
            alert(data.message);
            return;
          }

          login(data.user, data.token);
          nav("/");
          setEmail("");
          setPassword("");
          setName("");
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSuccess = async (credentialRes) => {
    try {
      const res = await fetch("http://localhost:3000/googleAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleToken: credentialRes.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      login(data.user, data.token);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginBody">
      <div className="loginCont">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="googleLogin">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
            />
          </div>
          {isSignUp && (
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="loginButt" type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="toggle" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
