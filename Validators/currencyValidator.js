// import fetchCurrencies from '../Api/fetchCurrencies.js'

export default function currencyValidator(currency, currencies) {
    const currenciesToUpperCase = currency.toUpperCase();
    if (currency.length !== 3 || !currencies.hasOwnProperty(currenciesToUpperCase)) {
        return false;
    }
    return true;
}