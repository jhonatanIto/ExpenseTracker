function SimulationResult(props) {
  const { currency, finalResult, totalCompound, totalInvested, displayResult } =
    props;
  return (
    <div
      style={{ display: displayResult }}
      className="simulatorResultContainer"
    >
      <div className="resultHeader">Result</div>
      <div className="resultBoxes">
        <div className="rBox finalBox">
          <div className="boxTitle">Final total balance</div>
          <div className="boxTotal">
            {currency} {finalResult}
          </div>
        </div>
        <div className="rBox">
          <div className="boxTitle">Total invested</div>
          <div className="boxTotal">
            {currency} {totalInvested}
          </div>
        </div>
        <div className="rBox">
          <div className="boxTitle">Total in compound</div>
          <div className="boxTotal">
            {currency} {totalCompound}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulationResult;
