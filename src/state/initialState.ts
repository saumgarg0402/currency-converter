import { CurrencyConverterSchema } from './CurrencyConverterStateSchema';
import RateSchema from '../schema/RateSchema';
import getFormattedDate from '../utils/getFormattedDate';

// required for caching info
// cache data with base EUR only
const initialState: CurrencyConverterSchema = {
    dateWiseRates: new Map<string, RateSchema>(),
    sourceSymbol: 'EUR', // defaulting to EUR as that is our base
    sourceValue: '',
    targetSymbol: '',
    targetValue: '',
    selectedDate: getFormattedDate(new Date()),
}

export default initialState;