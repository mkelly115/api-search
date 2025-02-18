"use client"

import { useState, useEffect } from "react"

export default function LocalWeather(){

const [localWeather, setLocalWeather] = useState(null);
const [loading, setloading] = useState(false);
const [error, setError] = useState(null);

const fetchWeather = async () => {
    setloading(true);
    setError(false);

    try{
        const response = await fetch(`https://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WeatherAPI}&query=New York`)
        const data = await response.json();
        console.log(data)
        setLocalWeather(data);
    } catch(error){
        setError(error.message)
    } finally{
        setloading(false)
    }
}


return(

    <form>
        <label>Enter Your City!</label>
        <input id="input-field"></input>
        <button onClick={fetchWeather}>Search Here!</button>
    
    </form>


)


}