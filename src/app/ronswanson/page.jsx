"use client"

import { useState, useEffect } from "react"
import "../ronswanson/styles.css"
const RonSwanson = "/ron-swanson-from-parks-and-recreation.jpg"

export default function RonQuotes(){
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchQuote = async () => {
        setLoading(true);
        setError(false);

        try{
            const response = await fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes/");
            const data = response.json();

            setQuote(data);

        } catch(error){
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchQuote();
    }, [])

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error.message}</p>
    }

    return(
        <div>
            {quote && (
                <>
                <img src={RonSwanson}></img>
                <h1>{quote}</h1>
                <div style={{textAlign: "center"}}>
                    <button onClick={fetchQuote}>New Ron Swanson Quote</button>
                </div>
                </>
            )}
        </div>

    )
};