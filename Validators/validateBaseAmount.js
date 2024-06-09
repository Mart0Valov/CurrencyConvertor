export default function validateBaseAmount(amount) {
    try {
        const decimals = amount.split('.')[1];
        if (decimals.length > 3) {
            return false;
        }
        return true;
    } catch (err) {
        return true;
    }
}