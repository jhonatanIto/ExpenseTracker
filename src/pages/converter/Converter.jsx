import { useEffect, useState } from "react";
import "./converter.css";
function Converter() {
  const [dollarValue, setDollarValue] = useState(1);
  const [yenValue, setYenValue] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const [hover, setHover] = useState(false);
  const [todayExchange, setTodayExchange] = useState();
  const oneDay = 1000 * 60 * 60 * 24;
  async function fetchDollarToYen() {
    const cached = localStorage.getItem("usd_jpy_rate");

    if (cached) {
      const { rate, timestamp } = JSON.parse(cached);

      if (Date.now() - timestamp < oneDay) {
        console.log("using cache");
        console.log(Number(rate).toFixed(0));
        setTodayExchange(Number(rate).toFixed(0));
        setYenValue(Number(rate).toFixed(0));
        return;
      }
    }
    console.log("fetching API");

    const response = await fetch(
      "https://api.exchangerate.host/live?access_key=037b529c6c1985c3958886d852954930"
    );
    const data = await response.json();
    const rate = data.quotes["USDJPY"];

    localStorage.setItem(
      "usd_jpy_rate",
      JSON.stringify({
        rate,
        timestamp: Date.now(),
      })
    );
    setTodayExchange(rate);
  }

  useEffect(() => {
    fetchDollarToYen();
  }, []);

  function formatUSD(value) {
    if (value === "" || value == null) return "";
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatJPY(value) {
    if (value === "" || value == null) return "";
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return (
    <div className="converterBody">
      <div className="box">
        <div className="moneyContainer">
          <img className="moneyImg" src="src\assets\dollarr.png" />
          <img className="moneyImg" src="src\assets\1000yen.jpg" />
        </div>
        <div className="botContainer">
          <div className="oneSide">
            <div className="todaynone">today</div>
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`value ${isFocused || hover ? "valueFocus" : ""}`}
            >
              <div>$</div>
              <input
                value={formatUSD(dollarValue)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");

                  if (raw === "" || isNaN(raw)) {
                    setDollarValue("");
                    setYenValue("");
                    return;
                  }
                  setDollarValue(raw);

                  const converted = Number(raw) * todayExchange;
                  setYenValue(converted.toFixed(2));
                }}
                className={`input ${isFocused ? "inputFocus" : ""}`}
                style={{ width: `${String(dollarValue).length}ch` }}
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>
          <div className="worth">is worth</div>
          <div className="oneSide">
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`value ${isFocused || hover ? "valueFocus" : ""}`}
            >
              <div>¥</div>
              <input
                value={formatJPY(yenValue)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");

                  if (raw === "" || isNaN(raw)) {
                    setYenValue("");
                    setDollarValue("");
                    return;
                  }

                  setYenValue(raw);

                  const converted = Number(raw) / todayExchange;
                  setDollarValue(converted.toFixed(2));
                }}
                className={`input ${isFocused ? "inputFocus" : ""}`}
                style={{ width: `${formatJPY(yenValue).length}ch` }}
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            <div className="today">today</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Converter;
