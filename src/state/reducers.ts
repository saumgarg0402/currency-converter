import { CurrencyConverterSchema } from './CurrencyConverterStateSchema'
import initialState from './initialState';
import assign from 'lodash-es/assign';
import RateSchema from '../schema/RateSchema';

const reducer = (state: CurrencyConverterSchema, action): CurrencyConverterSchema => {
    switch(action.type) {
        case 'ADD_RATES_FOR_DATE': {
            const requiredDate = action.payload.date;
            const rates = action.payload.rates;

            //create a clone
            let currentMap: Map<string, RateSchema> = new Map<
                string,
                RateSchema
            >(state.dateWiseRates);

            // if key already present, delete and add again, to handle update scenarios
            // as we cache only base EUR, no need to compare at base
            if (currentMap.has(requiredDate)) {
                currentMap.delete(requiredDate);
            }

            currentMap.set(requiredDate, rates);

            return assign({}, state, { dateWiseRates: currentMap });
        }
        case 'UPDATE_SOURCE_SYMBOL':
            return assign({}, state, { sourceSymbol: action.payload });
        case 'UPDATE_SOURCE_VALUE':
                return assign({}, state, { sourceValue: action.payload });
        case 'UPDATE_TARGET_SYMBOL':
            return assign({}, state, { targetSymbol: action.payload });
        case 'UPDATE_TARGET_VALUE':
                return assign({}, state, { targetValue: action.payload });
        case 'UPDATE_SELECTED_DATE':
                return assign({}, state, { selectedDate: action.payload });
        case 'CLEAR_STATE':
            return { ...initialState };
        default:
            return state;
    }
}

export default reducer;