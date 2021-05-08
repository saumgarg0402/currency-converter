
interface RateSchema {
    base: string;
    rates: {
        [symbol: string]: number,
    };
    date: string
}

export default RateSchema;