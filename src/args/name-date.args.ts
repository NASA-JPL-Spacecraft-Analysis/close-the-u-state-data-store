import { ArgsType, Field } from 'type-graphql';

import { DateArgs } from '.';

@ArgsType()
export class NameDateArgs extends DateArgs {
  @Field()
  public name: string;
}
