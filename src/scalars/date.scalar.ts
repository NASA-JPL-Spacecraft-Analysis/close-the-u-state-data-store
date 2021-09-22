import { GraphQLScalarType, StringValueNode } from 'graphql';
import parse from 'date-fns/parse'
import format from 'date-fns/format'

const dateFormat = 'yyyy-DDD\'T\'HH:mm:ss.SSS';
const dateFormatTimezone = dateFormat + ' X';

export const DateScalar = new GraphQLScalarType({
  name: 'ScetDateTime',
  description: 'Scet date time',
  serialize(value: string): string {
    return format(new Date(value), dateFormat);
  },
  parseValue(value: unknown): Date {
    console.log('parse');
    console.log(value);

    return new Date();
  },
  parseLiteral(value: unknown): Date {
    return parse((value as StringValueNode).value + ' -00', dateFormatTimezone, new Date());
  }
});
