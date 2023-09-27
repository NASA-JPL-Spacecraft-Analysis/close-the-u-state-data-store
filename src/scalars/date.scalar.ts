import { GraphQLScalarType, StringValueNode } from 'graphql';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';

const dateFormat = "yyyy-DDD'T'HH:mm:ss.SSS";

export const DateScalar = new GraphQLScalarType({
  name: 'ScetDateTime',
  description: 'Scet date time',
  serialize(value: string): string {
    return formatInTimeZone(value, 'PST', dateFormat);
  },
  parseValue(value: unknown): Date {
    return zonedTimeToUtc(value as string, 'PST');
  },
  parseLiteral(value: unknown): Date {
    return zonedTimeToUtc((value as StringValueNode).value, 'PST');
  }
});
