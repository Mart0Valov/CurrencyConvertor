import data from '../config.json' assert { type: 'json' };

const api_key = data.api_key;

export const currenciesEndPoint = () => `https://api.fastforex.io/currencies?api_key=${api_key}`;

export const fetchOneEndPoint = (from, to) => `https://api.fastforex.io/fetch-one?from=${from}&to=${to}&api_key=${api_key}`;
