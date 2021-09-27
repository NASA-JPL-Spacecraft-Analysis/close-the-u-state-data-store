import { GraphQLScalarType, StringValueNode } from 'graphql';
import format from 'date-fns/format'
import { zonedTimeToUtc } from 'date-fns-tz'

const dateFormat = 'yyyy-DDD\'T\'HH:mm:ss.SSS';

export const DateScalar = new GraphQLScalarType({
  name: 'ScetDateTime',
  description: 'Scet date time',
  serialize(value: string): string {
    return format(new Date(value), dateFormat);
  },
  parseValue(value: unknown): Date {
    return new Date();
  },
  parseLiteral(value: unknown): Date {
    return zonedTimeToUtc((value as StringValueNode).value, 'America/Los_Angeles');
  }
});
