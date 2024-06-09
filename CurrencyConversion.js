import fetchCurrencies from './Api/fetchCurrencies.js';
import fetchOne from './Api/fetchOne.js';


async function initCurrencies() {
    // const data = await fetchCurrencies();
    const data = await fetchOne('usd', 'eur');
    console.log(data);
}
// fetchCurrencies().then(data => console.log(data));
initCurrencies();

