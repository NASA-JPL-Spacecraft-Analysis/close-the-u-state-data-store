import { Field, InputType } from 'type-graphql';

import { CreateEventInput } from '.';

@InputType()
export class CreateEventsInput {
  @Field(() => [ CreateEventInput ])
  public events!: CreateEventInput[];
}

