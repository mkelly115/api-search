"use client";

import { useState } from "react";

const CurrencySelector = ({ label, selectedCurrency, onChange, currencies }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={selectedCurrency} onChange={(e) => onChange(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;