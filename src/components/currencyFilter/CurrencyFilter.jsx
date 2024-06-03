"use client"
import React, { useState, useEffect } from 'react';

const CurrencyFilter = ({ selectedCurrencies = [], onChange }) => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch currencies");
        }
        const data = await response.json();
        const allCurrencies = data.products.map(product => product.currency);
        const uniqueCurrencies = Array.from(new Set(allCurrencies));
        setCurrencies(uniqueCurrencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (event, currency) => {
    const isChecked = event.target.checked;
    const updatedCurrencies = isChecked
      ? [...selectedCurrencies, currency]
      : selectedCurrencies.filter(curr => curr !== currency);
    onChange(updatedCurrencies);
  };

  return (
    <div> 
      <ul className="flex flex-col items-start justify-center gap-2">
        {currencies.map((currency, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`currency-${index}`}
              value={currency}
              checked={selectedCurrencies.includes(currency)}
              onChange={(event) => handleCurrencyChange(event, currency)}
              className="hidden"
            />
            <label
              htmlFor={`currency-${index}`}
              className={`inline-flex text-sm items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: '100%' }} // Set width to 100% for the label container
            >
              <input
                type="checkbox"
                checked={selectedCurrencies.includes(currency)}
                onChange={(event) => handleCurrencyChange(event, currency)}
                className="accent-gray-800 w-6 h-6 text-white border-gray-300 rounded   mr-2 peer peer-checked:bg-gray-500 peer-checked:text-gray-900"
              />
              <span className="text-md font-medium">{currency}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyFilter;
