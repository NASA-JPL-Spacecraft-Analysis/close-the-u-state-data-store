import { Field, InputType } from 'type-graphql';

import { CreateStateInput } from '.';

@InputType()
export class CreateStatesInput {
  @Field(() => [ CreateStateInput ])
  public states!: CreateStateInput[];
}
