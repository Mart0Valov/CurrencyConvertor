import fetchCurrencies from './Api/fetchCurrencies.js';

async function initCurrencies() {
    const data = await fetchCurrencies();
    console.log(data);
}
// fetchCurrencies().then(data => console.log(data));
initCurrencies();