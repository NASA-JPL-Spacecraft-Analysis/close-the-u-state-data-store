import { Field, InputType } from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';

import { Vector } from '../models/vector';
import { STATUS, TYPE, VECTOR_SLOT_VALUE_TYPE } from '../models';

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

  @Field(() => STATUS)
  public status!: STATUS;

  @Field(() => TYPE)
  public type!: TYPE;

  @Field(() => VECTOR_SLOT_VALUE_TYPE)
  public valueType!: VECTOR_SLOT_VALUE_TYPE;

  @Field(() => GraphQLJSON)
  public vector!: Vector;

  @Field()
  public vectorSlot!: string;
}
