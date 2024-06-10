import readline from 'node:readline';
import validateBaseAmount from "./Validators/validateBaseAmount.js";
import currencyValidator from "./Validators/currencyValidator.js";
import fetchCurrencies from './Api/fetchCurrencies.js'
import fetchOne from './Api/fetchOne.js';
import fs from 'fs/promises';
import readAndWriteJson from './DataUtils/writeToDataJson.js';
// TODO: accept date as flag
// Make requests with that flag historycal

const dateFlag = process.argv[2];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currencies = {};
const cache = {};

const currentConversion = {
    amount: 0,
    baseCurrency: '',
    targetCurrency: ''
};

function main(command) {
    const inputToLowerCase = command.toLowerCase();
    if (inputToLowerCase === 'end') {
        rl.close();
    } else {
        if (!currentConversion.amount) {
            if (validateBaseAmount(inputToLowerCase)) {
                currentConversion.amount = parseFloat(inputToLowerCase);
            } else {
                console.log('Please enter a valid amount');
            }
        } else if (!currentConversion.baseCurrency) {
            if (currencyValidator(inputToLowerCase, currencies)) {
                currentConversion.baseCurrency = inputToLowerCase.toUpperCase();
            } else {
                console.log('Please enter a valid currency code');
            }
        } else if (!currentConversion.targetCurrency) {
            if (currencyValidator(inputToLowerCase, currencies)) {
                currentConversion.targetCurrency = inputToLowerCase.toUpperCase();

                const cacheKey = currentConversion.baseCurrency + currentConversion.targetCurrency;
                if (cacheKey in cache) {
                    const conversed = (currentConversion.amount * cache[cacheKey].results[currentConversion.targetCurrency]).toFixed(2);

                    console.log(`${currentConversion.amount} ${currentConversion.baseCurrency} is ${conversed} ${currentConversion.targetCurrency}`)
                    // console.log(cache);
                    const conversionData = {
                        date: dateFlag,
                        amount: currentConversion.amount,
                        base_currency: currentConversion.baseCurrency,
                        target_currency: currentConversion.targetCurrency,
                        converted_amount: currentConversion.amount * cache[cacheKey].results[currentConversion.targetCurrency]
                    }

                    readAndWriteJson('./conversions.json', conversionData);
                    resetCurrentConversion();
                } else {
                    fetchOne(currentConversion.baseCurrency, currentConversion.targetCurrency, dateFlag).then(data => {

                        const conversed = (currentConversion.amount * data.results[currentConversion.targetCurrency]).toFixed(2);

                        console.log(`${currentConversion.amount} ${currentConversion.baseCurrency} is ${conversed} ${currentConversion.targetCurrency}`)

                        cache[cacheKey] = data;
                        console.log(cache);

                        const conversionData = {
                            date: dateFlag,
                            amount: currentConversion.amount,
                            base_currency: currentConversion.baseCurrency,
                            target_currency: currentConversion.targetCurrency,
                            converted_amount: currentConversion.amount * data.results[currentConversion.targetCurrency]
                        }
                        readAndWriteJson('./conversions.json', conversionData);
                        resetCurrentConversion();
                    });
                }
            } else {
                console.log('Please enter a valid currency code');
            }
        }
    }
}

function resetCurrentConversion() {
    currentConversion.amount = 0;
    currentConversion.baseCurrency = '';
    currentConversion.targetCurrency = '';
}

fetchCurrencies()
    .then(data => currencies = data.currencies)
    .then(() => {
        rl.on('line', (input) => {
            main(input);
        });

        rl.on('close', () => {
            process.exit(0);
        });
    })
    .catch(err => console.log(err));