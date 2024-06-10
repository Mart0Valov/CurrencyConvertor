import readline from 'node:readline';
import validateBaseAmount from "./Validators/validateBaseAmount.js";
import currencyValidator from "./Validators/currencyValidator.js";
import fetchCurrencies from './Api/fetchCurrencies.js'
import fetchOne from './Api/fetchOne.js';

// TODO: accept date as flag
// Make requests with that flag historycal

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currencies = {};

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
                
                fetchOne(currentConversion.baseCurrency, currentConversion.targetCurrency).then(data => {
                    console.log(currentConversion.amount * data.result[currentConversion.targetCurrency]);
                    resetCurrentConversion();
                    // cache functionality
                    // saving to json file
                    // reset currentConversion
                });


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