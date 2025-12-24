import { useState } from "react";

function Calculator() {
  const [initialValue, setInitialValue] = useState();
  const [monthlyValue, setMonthlyValue] = useState();
  const [interestRate, setInterestRate] = useState();
  const [period, setPeriod] = useState();
  const [yearOrMonth, setYearOrMonth] = useState("year");
  const [rateYearMonth, setRateYearMonth] = useState("year");

  function formatedValue(e, set) {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    if (raw === "") {
      set("");
      return;
    }
    const number = Number(raw);
    if (!isNaN(number)) {
      set(new Intl.NumberFormat("en-US").format(number));
    }
  }

  function simulate() {
    const principal = Number(initialValue.replace(/,/g, ""));
    const monthlyContribution = Number(monthlyValue.replace(/,/g, ""));
    const rate =
      rateYearMonth === "year"
        ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
        : interestRate / 100;
    const periodoo =
      yearOrMonth === "year"
        ? Number(period.replace(/,/g, "")) * 12
        : Number(period.replace(/,/g, ""));

    const calc =
      principal * Math.pow(1 + rate, periodoo) +
      monthlyContribution * ((Math.pow(1 + rate, periodoo) - 1) / rate);

    const result = new Intl.NumberFormat("en-US").format(calc);
    alert(result);
  }

  return (
    <div className="calcContainer">
      <header className="calcHeader">Compound Interest Simulator</header>
      <div className="simulationCalcBox">
        <div className="calcUp">
          <div>
            <div> Initial value</div>
            <div className="flex ">
              <div className="simb">$</div>
              <input
                value={initialValue}
                onChange={(e) => {
                  formatedValue(e, setInitialValue);
                }}
                className="calcInput"
                placeholder="00,00"
                type="text"
              />
            </div>
          </div>

          <div>
            <div>Monthly value</div>
            <div className="flex">
              <div className="simb">$</div>
              <input
                value={monthlyValue}
                onChange={(e) => {
                  formatedValue(e, setMonthlyValue);
                }}
                className="calcInput"
                placeholder="00,00"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="calcUp">
          <div>
            <div> Interest rate</div>
            <div className="flex">
              <div className="simb">%</div>
              <input
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="calcInputYear"
                placeholder="8"
                type="number"
              />
              <select
                onChange={(e) => {
                  setRateYearMonth(e.target.value);
                }}
                className="yearButt"
              >
                <option value="year">year</option>
                <option value="month">month</option>
              </select>
            </div>
          </div>
          <div>
            <div>Period</div>
            <div className="flex">
              <input
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="calcInputYear"
                placeholder="1"
                type="number"
              />
              <select
                onChange={(e) => setYearOrMonth(e.target.value)}
                className="yearButt"
              >
                <option value="year">year(s)</option>
                <option value="month">month(s)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="calcButtonsCont">
        <button onClick={simulate} className="calcButt">
          Calculate
        </button>
        <button
          onClick={() => {
            setInitialValue("");
            setInterestRate("");
            setMonthlyValue("");
            setPeriod("");
          }}
          className="clearButt"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default Calculator;
