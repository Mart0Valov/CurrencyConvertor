import fetch from 'node-fetch';

import { fetchOneEndPoint } from './endpoints.js';

export default async function fetchOne(from, to , date) {
    try {
        const request = await fetch(fetchOneEndPoint(from, to, date));
        const response = await request.json();
        return response;
    } catch (err) {
        console.log(err.message);
    }
}