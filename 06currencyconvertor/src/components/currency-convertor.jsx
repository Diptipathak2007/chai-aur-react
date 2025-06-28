import { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiSwitchHorizontal } from "react-icons/hi"; // ✅ correct icon from HeroIcons v1

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount || fromCurrency === toCurrency) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4  bg-cover bg-center bg-no-repeat."
      style={{
        backgroundImage:
          "url('')",
      }}
    >
      <div className="w-full max-w-xl p-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
          Currency Converter
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-4">
          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            title="From:"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            handleFavorite={handleFavorite}
          />

          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-md transition duration-200"
            >
              <HiSwitchHorizontal className="text-2xl text-gray-700" />
            </button>
          </div>

          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            title="To:"
            currency={toCurrency}
            setCurrency={setToCurrency}
            handleFavorite={handleFavorite}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={convertCurrency}
            className={`px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 ${
              converting ? "animate-pulse" : ""
            }`}
          >
            Convert
          </button>
        </div>

        {convertedAmount && (
          <div className="mt-6 text-right text-green-700 text-lg font-semibold">
            Converted Amount: {convertedAmount}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
