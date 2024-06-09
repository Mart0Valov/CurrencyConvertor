import fetch from 'node-fetch';
import data from '../config.json' assert { type: 'json' };

const apiKey = data.api_key;
const endPoint = `https://api.fastforex.io/currencies?api_key=${apiKey}`;


export default async function fetchCurrencies() {
    // Function to fetch all available currencies.
    try {
        const request = await fetch(endPoint);
        const response = await request.json();
        return response;
    } catch (err) {
        console.log(err.message);
    }
}

// fetch(endPoint).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))