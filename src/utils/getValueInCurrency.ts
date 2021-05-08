
/**
 * 
 * @param targetRate is the target currency rate with base as selected
 * @param value is the value in source currency
 * @returns value in target currency
 */
const getValueInCurrency = (targetRate: number, value: number) => {

    return targetRate*value;

}

export default getValueInCurrency;