// import data from '../config.json' assert { type: 'json' };
// import readData from '../DataUtils/readJsonData.js';
import fs from 'fs';
let api_key = JSON.parse(fs.readFileSync('./config.json')).api_key;

export const currenciesEndPoint = () => `https://api.fastforex.io/currencies?api_key=${api_key}`;

export const fetchOneEndPoint = (from, to) => `https://api.fastforex.io/fetch-one?from=${from}&to=${to}&api_key=${api_key}`;
