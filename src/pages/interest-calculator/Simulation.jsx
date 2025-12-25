import Calculator from "./simulationComponents/Calculator";
import SimulationResult from "./simulationComponents/SimulationResult";
import { useEffect, useState } from "react";

function Simulation() {
  const [interestRate, setInterestRate] = useState();
  const [period, setPeriod] = useState();
  const [yearOrMonth, setYearOrMonth] = useState("year");
  const [rateYearMonth, setRateYearMonth] = useState("year");
  const [currency, setCurrency] = useState("$");
  const [finalResult, setFinalResult] = useState();
  const [totalInvested, setTotalInvested] = useState();
  const [totalCompound, setTotalCompound] = useState();
  const [displayResult, setDisplayResult] = useState("none");

  useEffect(() => {
    const curr = JSON.parse(localStorage.getItem("currCurrency")) || "$";
    setCurrency(curr);
  }, []);

  return (
    <div className="simulationBody">
      <Calculator
        setDisplayResult={setDisplayResult}
        setTotalCompound={setTotalCompound}
        setTotalInvested={setTotalInvested}
        setFinalResult={setFinalResult}
        currency={currency}
        setCurrency={setCurrency}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        period={period}
        setPeriod={setPeriod}
        yearOrMonth={yearOrMonth}
        setYearOrMonth={setYearOrMonth}
        rateYearMonth={rateYearMonth}
        setRateYearMonth={setRateYearMonth}
      />
      <SimulationResult
        displayResult={displayResult}
        totalCompound={totalCompound}
        totalInvested={totalInvested}
        finalResult={finalResult}
        currency={currency}
      />
    </div>
  );
}

export default Simulation;
