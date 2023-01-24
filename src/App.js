import "./styles.css";
import { React, useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [budget, setBudget] = useState("");
  const [currentCoin, setCurrentCoin] = useState();

  function budgetChange(event) {
    setBudget(event.target.value);
  }
  function currentChange(event) {
    setCurrentCoin(event.target.value);
    console.log(event);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
      <h1>Coin Tracker</h1>
      <h2>Select Coin!</h2>
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <input
            type="number"
            placeholder="My budget (USD)"
            value={budget}
            onChange={budgetChange}
          ></input>
          <input
            type="number"
            placeholder="You can buy"
            value={budget / currentCoin}
            disabled="true"
          ></input>
          <select onChange={currentChange}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price} key={coin.id}>
                {coin.name}({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
