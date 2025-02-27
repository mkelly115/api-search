export async function GET(req) {
    try {

    
        const { searchParams } = new URL(req.url);
        const currencies = searchParams.get("currencies");
        const base_currency = searchParams.get("base_currency");


        const apiKey = process.env.NEXT_PUBLIC_CURRENCY_API;
        if (!apiKey) {
            console.error("API Key is missing.");
            return new Response(
                JSON.stringify({ error: "API Key is missing." }),
                { status: 500 }
            );
        }
        
        const response = await fetch(
            `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${currencies}&base_currency=${base_currency}`
        );

 
        
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
 

        // Get the exchange rate from the response
        const exchangeRate = data.data[currencies];
        if (!exchangeRate) {
            console.error(`Exchange rate for ${currencies} not found in API response.`);
            throw new Error(`Exchange rate for ${currencies} not found.`);
        }

        console.log("Exchange rate found:", exchangeRate);

        // Respond with exchange rate
        return new Response(JSON.stringify({ exchangeRate }), { status: 200 });
    } catch (error) {
        console.error("Error in GET request:", error);
        console.error("Stack trace:", error.stack);

        return new Response(
            JSON.stringify({ error: error.message, details: error.stack }),
            { status: 500 }
        );
    }
}
