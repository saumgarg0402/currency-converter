import RateSchema from '../schema/RateSchema';

export const addRatesForDate = (date: string, rates: RateSchema) => ({
    type: "ADD_RATES_FOR_DATE",
    payload: {
        date,
        rates
    }
});

export const updateSourceSymbol = (sourceSymbol: string) => ({
    type: "UPDATE_SOURCE_SYMBOL",
    payload: sourceSymbol
});

export const updateSourceValue = (sourceValue: string) => ({
    type: "UPDATE_SOURCE_VALUE",
    payload: sourceValue
});

export const updateTargetSymbol = (targetSymbol: string) => ({
    type: "UPDATE_TARGET_SYMBOL",
    payload: targetSymbol
});

export const updateTargetValue = (targetValue: string) => ({
    type: "UPDATE_TARGET_VALUE",
    payload: targetValue
});

export const updateSelectedDate = (date: string) => ({
    type: "UPDATE_SELECTED_DATE",
    payload: date
});

export const clearState = () => ({
    type: 'CLEAR_STATE',
});