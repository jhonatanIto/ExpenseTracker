import Calculator from "./simulationComponents/Calculator";
import SimulationResult from "./simulationComponents/SimulationResult";

function Simulation() {
  return (
    <div className="simulationBody">
      <Calculator />
      <SimulationResult />
    </div>
  );
}

export default Simulation;
