import fetch from 'node-fetch';

import { fetchOneEndPoint } from './endpoints.js';

export default async function fetchOne(from ,to) {
    try {
        const request = await fetch(fetchOneEndPoint(from, to));
        const response = await request.json();
        return response;
    } catch (err) {
        console.log(err.message);
    }
}