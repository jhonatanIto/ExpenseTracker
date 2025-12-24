import { useState } from "react";

function Calculator() {
  const [initialValue, setInitialValue] = useState("");
  const [monthlyValue, setMonthlyValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");

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
              <select className="yearButt">
                <option value="yearly">year</option>
                <option value="monthly">month</option>
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
              <select className="yearButt">
                <option value="">year(s)</option>
                <option value="">month(s)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="calcButtonsCont">
        <button className="calcButt">Calculate</button>
        <button className="clearButt">Clear all</button>
      </div>
    </div>
  );
}

export default Calculator;
