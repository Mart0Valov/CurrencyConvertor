import fetch from 'node-fetch';
import { currenciesEndPoint } from './endpoints.js';

const endPoint = currenciesEndPoint();

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
