import React, { useEffect, useReducer } from 'react';
import reducer from '../state/reducers';
import initialState from '../state/initialState';
import { Stack } from '@fluentui/react/lib/Stack';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek } from '@fluentui/date-time-utilities/lib/dateValues/dateValues';
import {
    updateSelectedDate,
    updateSourceSymbol,
    updateTargetSymbol,
    updateSourceValue,
    updateTargetValue,
    addRatesForDate
} from '../state/actions';
import { symbolsList } from '../constants/symbolPicker';
import {
    ComboBox,
    IComboBox,
    IComboBoxOption,
} from '@fluentui/react/lib/ComboBox';
import { TextField } from '@fluentui/react/lib/TextField';
import { Text } from '@fluentui/react/lib/Text';
import RateSchema from '../schema/RateSchema';
import getValueInCurrency from '../utils/getValueInCurrency';
import getValueWithBaseEUR from '../utils/getValueWithBaseEUR';
import getData, { UrlParams } from '../apis/getData';
import getFormattedDate from '../utils/getFormattedDate';
import { IconButton } from '@fluentui/react/lib/Button';

const CurrencyConverter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onSelectDate = (date: Date | null | undefined) => {
        if(!!date) {
           dispatch(updateSelectedDate(getFormattedDate(date)));
        }
    }

    const convertCurrency = () => {
        const rates: RateSchema = state.dateWiseRates.get(state.selectedDate) || {base: '', rates: {}, date: ''};
        if(rates.base === state.sourceSymbol) {
            dispatch(updateTargetValue(getValueInCurrency(rates.rates[state.targetSymbol], Number(state.sourceValue)).toString()));
        } else if(rates.base === state.targetSymbol) {
            dispatch(updateTargetValue(getValueInCurrency((1/rates.rates[state.sourceSymbol]), Number(state.sourceValue)).toString()));
        }else {
            dispatch(updateTargetValue(getValueWithBaseEUR(rates.rates[state.sourceSymbol],rates.rates[state.targetSymbol], Number(state.sourceValue)).toString()));
        }
    }

    const loadData = (date: string) => {
        const urlParams: UrlParams = {
            date: date,
            base: 'EUR', // pull EUR only as it enriches cache, conversions are quick
        };
        getData(urlParams).then(data => {

            //TODO: improve this check once error handling is added
            // if valid value returned, add to cache
            if(!!data.base){
                dispatch(addRatesForDate(state.selectedDate, data));
                convertCurrency();
            }

        });
    }

    const switchSymbols = () => {
        const temp: string = state.sourceSymbol;
        dispatch(updateSourceSymbol(state.targetSymbol));
        dispatch(updateTargetSymbol(temp));
    }

    const onSymbolChange = action => (
        event?: React.FormEvent<IComboBox>,
        symbol?: IComboBoxOption
    ) => dispatch(action(symbol?.text || ''));

    const onSourceValueChange = (
        event?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue?: string
    ) => dispatch(updateSourceValue(newValue || ''));

    useEffect(() => { 

        // if any value changes, and all other values valid, re-calculate the converted value
        if(!!state.sourceValue && !!state.sourceSymbol && !!state.targetSymbol) {
            convertCurrency();
        }
    }, [state.sourceValue, state.sourceSymbol, state.targetSymbol]);

    useEffect(() => {

        // if data already present, use cached data for re-calculation
        // else make the api call
        if(state.dateWiseRates.get(state.selectedDate)) {
            convertCurrency();
        } else {
            loadData(state.selectedDate);
        }

    }, [state.selectedDate]);

    //load data for today on first load
    useEffect(() => {

        loadData(getFormattedDate(new Date()));

    }, []);

    return (
        <Stack tokens={{ childrenGap: 25 }}>
            <DatePicker 
                firstDayOfWeek={DayOfWeek.Sunday} 
                placeholder="Select a date..." 
                ariaLabel="Select a date" 
                onSelectDate={onSelectDate}
                styles={{ root: { width: 400, padding: 10}}}
                value={new Date()}
            />
            <Stack horizontal={true} styles={{ root: { padding: 10}}} tokens={{ childrenGap: 15 }}>
                <ComboBox
                    ariaLabel="Select source symbol"
                    options={symbolsList}
                    selectedKey={state.sourceSymbol}
                    placeholder="Select source symbol"
                    onChange={onSymbolChange(updateSourceSymbol)}
                    useComboBoxAsMenuWidth={true}
                    scrollSelectedToTop={true}
                    styles={{ optionsContainerWrapper : { height: 400}}}
                />
                <IconButton
                    iconProps={{ iconName: 'Switch' }}
                    onClick={switchSymbols}
                    ariaLabel="Switch source and target"
                />
                <ComboBox
                    ariaLabel="Select target symbol"
                    options={symbolsList}
                    selectedKey={state.targetSymbol}
                    placeholder="Select target symbol"
                    onChange={onSymbolChange(updateTargetSymbol)}
                    useComboBoxAsMenuWidth={true}
                    scrollSelectedToTop={true}
                    styles={{ optionsContainerWrapper : { height: 400}}}
                />
            </Stack>
            <Stack horizontal={true} styles={{ root: { marginLeft: 10}}} tokens={{ childrenGap: 100 }}>
                <Stack>
                    <TextField 
                        ariaLabel="Value to convert"
                        label="Value to convert" 
                        borderless={true} 
                        placeholder="Enter value for conversion" 
                        value={state.sourceValue}
                        onChange={onSourceValueChange}
                    />
                </Stack>
                <Stack>
                    <Text styles={{ root: { fontWeight: 600}}}>{"Converted value"}</Text>
                    <Text styles={{ root: { fontSize: 16 }}}>{state.targetValue}</Text>
                </Stack>
            </Stack>
        </Stack>
    );

};

export default CurrencyConverter;