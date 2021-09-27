import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class DateArgs {
  @Field()
  public start: Date;

  @Field()
  public end: Date;
}
