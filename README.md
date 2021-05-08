# Bidirectional Currency Converter

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Functionalities available
- Select a date for conversion rate
- Select source and target currencies
- Easily switch between source and target

### State management details
- `useReducer` hook is used for managing state
- rates data for different dates is cached. If data for a particular date is already present, it is used from cache.
- rates are pulled with base EUR only, to reduce multiple api hits, and enrich cache.
- `useEffect` hook used to track user input and convert currency in realtime

### UX Components
- [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui#/get-started) library is used. The library provides responsive, accessible components out of the box
- `Fluent Datepicker` is used for day selection. As api gives data for a date only, time picker has not been provided.
- `Fluent ComboBox` is used to allow for currency selection as it gives the option to manually enter the tet as well.
- `Fluent TextField` is used to capture user input

### Implementation details
- `fetch` is used to pull api data
- App schema contains rates cache and current selected user values
```typescript
    interface CurrencyConverterSchema {
    dateWiseRates: Map<string, RateSchema>;
    sourceSymbol: string;
    sourceValue: string;
    targetSymbol: string;
    targetValue: string;
    selectedDate: string;
}
```
- Cache rates schema
```typescript
interface RateSchema {
    base: string;
    rates: {
        [symbol: string]: number,
    };
    date: string
}
```

### Hosting details
- Hosted using github library `gh-pages`
- Package management done using `npm`


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
