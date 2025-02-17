"use client"

import { useEffect, useState } from "react"

export default function CatPics() {
    const [pick, setPick] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCat = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://corsproxy.io/https://random-d.uk/api/v2/random")
            const data = await response.json();

            setPick(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }

    };

    useEffect(() => {
        fetchCat();
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        console.log(error)
        return <p>Error: {error.message}</p>
        
    }

    return (
        <div>
            {pick && (

                <img src={pick.url}></img>
            )

            }

        </div>

    )

};