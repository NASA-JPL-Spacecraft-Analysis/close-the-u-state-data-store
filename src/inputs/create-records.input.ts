import { Field, InputType } from 'type-graphql';

import { CreateRecordInput } from '.';

@InputType()
export class CreateRecordsInput {
  @Field(() => [ CreateRecordInput ])
  public records!: CreateRecordInput[];
}
