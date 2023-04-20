import { Service } from 'typedi';

import {
    STATE_TYPES,
    STATE_VALUE_TYPES,
    EVENT_TYPES
} from '../constants';

import { Node, State } from '../models';

@Service()
export class ValidationService {

     /**
     * Validates the states against their types and validates some states have the correct valueType
     *
     * @param states The list of states to to validate the type and possible valueType.
     * @returns a boolean if the types are valid and an error message (optional)
     */
    public validateStateTypes(states: State[]): {
        errorMessage?: string;
        valid: boolean;
    } {
        let invalidStates = '';
        let invalidValueTypes = '';

        for (const [index, state] of states.entries()) {
            // check that the state type is valid
            if (state.type && !STATE_TYPES.has(state.type)) {
                const seperator = index !== states.length - 1 ? ', ' : ' ';
                invalidStates += `${state.name}: ${state.type}${seperator}`;
            }

            // check that states have the correct valueType
            if (state.type && STATE_VALUE_TYPES[state.type]) {
                if (!STATE_VALUE_TYPES[state.type].includes(state.valueType)) {
                    const seperator = index !== states.length - 1 ? ', ' : ' ';
                    invalidValueTypes += `${state.name}: ${state.type } valueType must be one of: (${STATE_VALUE_TYPES[state.type].join(', ')})${seperator}`;
                }
            }
        }

        if (invalidStates.length) {
            return {
                errorMessage:
                    'The following state(s) have invalid types: [' +
                    invalidStates +
                    '], please provide one of the following valid types for each state: ' +
                    Array.from(STATE_TYPES).join(', '),
                valid: false
            };
        }

        if (invalidValueTypes.length) {
            return {
                errorMessage:
                    'The following state(s) have invalid value types: [' +
                    invalidValueTypes + ']',
                valid: false
            };
        }

        return {
            valid: true
        };
    }

    /**
     * Looks at the passed items and ensures that if they have type it's valid.
     *
     * @param items The list of items to check.
     * @returns An error message (optionally) and a boolean if the types are valid.
     */
    public validateEventTypes(
        items: Node[],
    ): { errorMessage?: string; valid: boolean } {
        let invalidItems = '';

        for (const item of items) {
            if (item.type && !EVENT_TYPES.has(item.type)) {
                invalidItems += item.name + ': ' + item.type + ', ';
            }
        }

        if (invalidItems.length > 0) {
            // Remove the trailing comma and space before output.
            invalidItems = invalidItems.substring(0, invalidItems.length - 2);

            return {
                errorMessage:
                    'The following item(s) have invalid types: [' +
                    invalidItems +
                    '], please provide one of the following valid types for each item: ' +
                    Array.from(EVENT_TYPES).join(', '),
                valid: false
            };
        }

        return {
            valid: true
        };
    }
}
