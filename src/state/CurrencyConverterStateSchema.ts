import RateSchema from '../schema/RateSchema';

// map of date vs rates
export interface CurrencyConverterSchema {
    dateWiseRates: Map<string, RateSchema>;
    sourceSymbol: string;
    sourceValue: string;
    targetSymbol: string;
    targetValue: string;
    selectedDate: string;
}