import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [friendTipPercentage, setFriendTipPercentage] = useState(0);
  const tip  = bill * ((tipPercentage + friendTipPercentage) / 2) / 100;

  function handleSetbill(value) {
    if (value) setBill(Number(value));
    else setBill(0);
  }

  function handleSetTipPercentage(value, forFriend = false) {
    if (forFriend) {
      if (value) setFriendTipPercentage(value);
      else setFriendTipPercentage(0);
    } else {
      if (value) setTipPercentage(value);
      else setTipPercentage(0);
    }
  }

  function handleReset() {
    setBill(0);
    setTipPercentage(0);
    setFriendTipPercentage(0);
  }

  return (
    <div>
      <h2>Tip Calculator</h2>
      <BillInput bill={bill} onBillChange={handleSetbill} />
      <ServiceSatisfaction
        tipPercentage={tipPercentage}
        onTipChange={handleSetTipPercentage}
      >
        How did you like the service?
      </ServiceSatisfaction>
      <ServiceSatisfaction
        tipPercentage={friendTipPercentage}
        onTipChange={handleSetTipPercentage}
        forFriend="true"
      >
        How did your friend like the service?
      </ServiceSatisfaction>
      <CalculatedBillWithTip
        bill={bill}
        tip={tip}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

function BillInput({ bill, onBillChange }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="number"
        value={bill}
        onChange={(e) => onBillChange(Number(e.target.value))}
      ></input>
    </div>
  );
}

function ServiceSatisfaction({
  children,
  tipPercentage,
  onTipChange,
  forFriend,
}) {
  const satisfactionOptions = [
    {
      value: 0,
      text: "Dissattisfied",
    },
    {
      value: 5,
      text: "It was ok",
    },
    {
      value: 10,
      text: "It was good",
    },
    {
      value: 20,
      text: "Absolutely amazing!",
    },
  ];

  return (
    <div>
      <span>{children}</span>
      <select
        value={tipPercentage}
        onChange={(e) => onTipChange(Number(e.target.value), forFriend)}
      >
        {satisfactionOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >{`${option.text} (${option.value}%)`}</option>
        ))}
      </select>
    </div>
  );
}

function CalculatedBillWithTip({ bill, tip }) {
  return (
    <div>
      <h3>{`You pay $${bill + tip}($${bill} + $${tip})`}</h3>
    </div>
  );
}

export default App;
