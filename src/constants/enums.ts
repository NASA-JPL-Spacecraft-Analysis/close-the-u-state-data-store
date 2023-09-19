import { registerEnumType } from "type-graphql";

export enum VALUE_TYPE {
    MEASURED = 'MEASURED',
    PREDICTED = 'PREDICTED',
    DERIVED = 'DERIVED'
}

export enum VOLATILITY {
    VOLATILE = 'VOLATILE',
    NON_VOLATILE = 'NON_VOLATILE'
}


registerEnumType(VOLATILITY, {
    name: 'VOLATILITY'
});

registerEnumType(VALUE_TYPE, {
    name: 'VALUE_TYPE'
});