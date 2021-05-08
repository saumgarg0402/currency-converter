import {
    API_URL,
    NOW_VALUE,
    BASE_PARAM,
    SYMBOLS_PARAM,
} from '../constants/apiConstants';
import {
    RESPONSE_SUCCESS
} from '../constants/apiConstants';

export interface UrlParams {
    date?: string;
    base?: string;
    symbols?: string;
}

/**
 * 
 * @param callback what to do after request completes
 * @param urlParams: UrlParams
 * date: the date for which data is required, default is current
 * base: the base rate for conversion, default is EUR
 * symbols: the currencies for which rate is required, default is empty, all value returned
 * @returns the rate for symbols against base for given date
 */
const getData = async (urlParams: UrlParams) => {

    const timeValue: string = !!urlParams?.date ? urlParams?.date : NOW_VALUE;
    let reqURL: string = API_URL + timeValue;
    if(!!urlParams?.base && !!urlParams?.symbols) {
        reqURL += "?"+BASE_PARAM+urlParams?.base+"&"+SYMBOLS_PARAM+urlParams?.symbols;
    } else if (!!urlParams?.base) {
        reqURL += "?"+BASE_PARAM+urlParams?.base;
    } else if(!!urlParams?.symbols) {
        reqURL += "?"+SYMBOLS_PARAM+urlParams?.symbols;
    }

    try {
        const response = await fetch(reqURL);
        return response.json();
    } catch {
        return { base: '', rates: {}, date: ''};
    }

}

export default getData;