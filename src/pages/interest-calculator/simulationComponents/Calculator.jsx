function Calculator() {
  return (
    <div className="calcContainer">
      <header className="calcHeader">Compound Interest Simulator</header>
      <div className="simulationCalcBox">
        <div className="calcUp">
          <div>
            <div> Initial value</div>
            <div className="flex ">
              <div className="simb">$</div>
              <input className="calcInput" placeholder="00,00" type="number" />
            </div>
          </div>

          <div>
            <div>Monthly value</div>
            <div className="flex">
              <div className="simb">$</div>
              <input className="calcInput" placeholder="00,00" type="number" />
            </div>
          </div>
        </div>
        <div className="calcUp">
          <div>
            <div> Interest rate</div>
            <div className="flex">
              <div className="simb">%</div>
              <input className="calcInput" placeholder="8" type="number" />
            </div>
          </div>
          <div>
            <div>Period</div>
            <div className="flex">
              <input className="calcInputYear" placeholder="1" type="number" />
              <select className="yearButt">
                <option value="">years</option>
                <option value="">months</option>
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
