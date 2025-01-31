import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount); 
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-6 shadow-xl backdrop-blur-md bg-white/30">
        <h1 className="text-4xl font-semibold text-center bg-gradient-to-bl  from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-5">💱 Currency Converter</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOption={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amt) => setAmount(amt)}
            />
          </div>
          <div className="relative w-full flex justify-center mb-4">
            <button
              type="button"
              className="border-2 border-white rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-5 py-3 text-lg font-semibold transition-all duration-200 hover:from-gray-800 hover:via-gray-700 hover:to-gray-600 shadow-md"
              onClick={swap}
            >
              🔄 Swap
            </button>
          </div>
          <div className="w-full mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to} 
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-5 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:from-gray-800 hover:via-gray-700 hover:to-gray-600"

          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
