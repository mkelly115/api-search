"use client"

import { useState, useEffect } from "react";
import CurrencySelector from "@/components/CurrencyMenu/currencySelector";

export default function CurrencyExchange() {
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [secondCurrency, setSecondCurrency] = useState("EUR");
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const currencies = [
        "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", 
        "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", 
        "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR"
    ];

    const fetchCurrency = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/currency/?currencies=${secondCurrency}&base_currency=${baseCurrency}`);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("API Response:", data);
            
            setExchangeRate(data.exchangeRate);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (baseCurrency && secondCurrency) {
            fetchCurrency();
        }
    }, [baseCurrency, secondCurrency]);

    return (
        <div>
            <h1>Currency Converter</h1>
            <CurrencySelector
                label="Base Currency:"
                selectedCurrency={baseCurrency}
                onChange={setBaseCurrency}
                currencies={currencies}
            />
            <CurrencySelector
                label="Target Currency:"
                selectedCurrency={secondCurrency}
                onChange={setSecondCurrency}
                currencies={currencies}
            />
            <button onClick={fetchCurrency}>
                Exchange
            </button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {exchangeRate && (
                <p>
                    1 {baseCurrency} = {exchangeRate} {secondCurrency}
                </p>
            )}
        </div>
    );
}