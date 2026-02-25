import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contex/UserContext";

const Loading = () => {
  const [dot, setDot] = useState(" ");
  const { loading } = useContext(UserContext);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (count < 3) {
        setDot((prev) => prev + " .");
        count++;
      } else {
        setDot(" ");
        count = 0;
      }
    }, 380);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ display: loading ? "flex" : "none" }}
      className="modalBody select-none"
    >
      <div className="text-white  relative text-3xl flex ">
        loading
        <div className="absolute left-[110px] w-[50px] "> {dot}</div>
      </div>
    </div>
  );
};

export default Loading;
