import { Field, InputType } from 'type-graphql';

import { Vector } from '../models/vector';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateVectorSlotInput {
  @Field()
  public base!: string;

  @Field()
  public endTdt!: Date;

  @Field()
  public head!: string;

  @Field()
  public order!: string;

  @Field()
  public startTdt!: Date;

  @Field()
  public status!: string;

  @Field()
  public type!: string;

  @Field(() => GraphQLJSON)
  public vector!: Vector;

  @Field()
  public vectorSlot!: string;
}
