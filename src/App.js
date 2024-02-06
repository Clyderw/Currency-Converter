import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.css";

function App() {
  const [rates, setRates] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error in fetching data");
      });
  }, []);

  useEffect(() => {
    if (!rates) return;

    const fromRate = fromCurrency === "RUB" ? 1 : rates[fromCurrency];
    const toRate = toCurrency === "RUB" ? 1 : rates[toCurrency];

    const result = (fromPrice / fromRate) * toRate;
    setToPrice(result.toFixed(3));
  }, [fromCurrency, toCurrency, fromPrice, rates]);

  const onChangeFromPrice = (value) => {
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
