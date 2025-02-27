"use client"

import { useState } from "react"

export default function LocalWeather() {
  const [localWeather, setLocalWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("New York"); 

  const fetchWeather = async (event) => {
    event.preventDefault();  

    console.log("Weather API Key:", process.env.NEXT_PUBLIC_WeatherAPI);  

    setLoading(true);
    setError(false);

    if (!process.env.NEXT_PUBLIC_WeatherAPI) {
      console.error("API key is missing!");
      setError("API key is missing.");
      setLoading(false);
      return;  
    }

    try {
        const response = await fetch(`https://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WeatherAPI}&query=${city}`);
        const data = await response.json();
        console.log(data); 
        setLocalWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);  
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <form>
      <label>Enter Your City!</label>
      <input 
        id="input-field" 
        value={city} 
        onChange={(e) => setCity(e.target.value)}  
      />
      <button type="submit" onClick={fetchWeather}>Search Here!</button>
    </form>
  );
}

// Accidently created a loop - you deserved over totaling your API :/