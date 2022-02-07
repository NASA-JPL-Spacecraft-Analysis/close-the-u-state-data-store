import { Service } from 'typedi';

import { Node } from '../models';

@Service()
export class ValidationService {
  /**
   * Looks at the passed items and ensures that if they have type it's valid.
   * 
   * @param items The list of items to check.
   * @param types The valid set of types.
   * @returns An error message (optionally) and a boolean if the types are valid.
   */
  public validateTypes(items: Node[], types: Set<string>): { errorMessage?: string, valid: boolean } {
    let invalidItems = '';

    for (const item of items) {
      if (item.type && !types.has(item.type)) {
        invalidItems += item.name + ': ' + item.type + ', ';
      }
    }

    if (invalidItems.length > 0) {
      // Remove the trailing comma and space before output.
      invalidItems = invalidItems.substring(0, invalidItems.length - 2);

      return {
        errorMessage: 'The following item(s) have invalid types: [' + invalidItems + '], please provide one of the following valid types for each item: ' + Array.from(types).join(', '),
        valid: false
      };
    }

    return {
      valid: true
    };
  }
}
