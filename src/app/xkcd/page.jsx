"use client"

import { useEffect, useState } from "react";
import "../xkcd/styles.css"

export default function XKCD() {

    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchComic =  async () => {
        setLoading(true);
        setError(null);

        try{
            const randomNumber = Math.floor(Math.random() * 250 + 1)
            const response = await fetch(`https://corsproxy.io/https://xkcd.com/${randomNumber}/info.0.json`);
            const data = await response.json();

            setComic(data);
        } catch(err){
            setError(err.message);
        } finally {
            setLoading(false);
        }

    };

    useEffect(()=> {
        fetchComic();
    }, [])
  
    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error.message}</p>
    }

    return (
        <div>
            {comic && (
                <>
                <h1>{comic.title}</h1>
                <img src={comic.img}></img>
                <p>{comic.alt}</p>
                <button onClick={fetchComic}>Load New Comic</button>
                
                </>
            )}
        </div>
    )
};

