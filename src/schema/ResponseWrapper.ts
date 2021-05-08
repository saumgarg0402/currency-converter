import RateSchema from './RateSchema';
import ErrorSchema from './ErrorSchema';


interface ResponseWrapper {
    ResponseCode: string;
    Body?: RateSchema;
    Error?: ErrorSchema;
}

export default ResponseWrapper