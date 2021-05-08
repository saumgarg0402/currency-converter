
/**
 * @param sourceRate is source currency rate with base EUR
 * @param targetRate is the target currency rate with base as selected
 * @param value is the value in source currency
 * @returns value in target currency
 */
 const getValueWithBaseEUR = (sourceRate: number, targetRate: number, value: number) => {

    return (sourceRate/targetRate)*value;

}

export default getValueWithBaseEUR;