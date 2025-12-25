import { useState } from "react";

function Calculator(props) {
  const [initialValue, setInitialValue] = useState();
  const [monthlyValue, setMonthlyValue] = useState();

  const {
    rateYearMonth,
    setRateYearMonth,
    interestRate,
    yearOrMonth,
    period,
    setInterestRate,
    setYearOrMonth,
    setPeriod,
    setCurrency,
    currency,
    setFinalResult,
    setTotalCompound,
    setTotalInvested,
    setDisplayResult,
  } = props;

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
    const formatCalc = calc.toFixed(0);

    const result = new Intl.NumberFormat("en-US").format(formatCalc);
    setFinalResult(result);

    let totalInve = null;
    let totalComp = null;
    if (rateYearMonth === "year" && yearOrMonth === "year") {
      totalInve = (monthlyContribution * 12 * period + principal).toFixed(0);
      totalComp = (formatCalc - totalInve).toFixed(0);
    } else if (rateYearMonth === "month" && yearOrMonth === "year") {
      totalInve = principal + monthlyContribution * period * 12;
      totalComp = formatCalc - totalInve;
    } else {
      totalInve = principal + monthlyContribution * period;
      totalComp = formatCalc - totalInve;
    }
    setTotalInvested(new Intl.NumberFormat("en-US").format(totalInve));
    setTotalCompound(new Intl.NumberFormat("en-US").format(totalComp));
    setDisplayResult("flex");
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
        <div>
          <button onClick={simulate} className="calcButt">
            Calculate
          </button>
          <select
            value={
              currency === "$"
                ? "$"
                : currency === "¥"
                ? "¥"
                : currency === "€"
                ? "€"
                : "$"
            }
            onChange={(e) => {
              setCurrency(e.target.value);
              localStorage.setItem(
                "currCurrency",
                JSON.stringify(e.target.value)
              );
            }}
            className="ml-5"
          >
            <option value="$">usd</option>
            <option value="¥">jpy</option>
            <option value="€">euro</option>
          </select>
        </div>

        <button
          onClick={() => {
            setInitialValue("");
            setInterestRate("");
            setMonthlyValue("");
            setPeriod("");
            setDisplayResult("none");
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
