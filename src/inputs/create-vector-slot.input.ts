import { Field, InputType } from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';

import { STATUS, TYPE, VECTOR_SLOT_VALUE_TYPE } from '../models';

@InputType()
export class CreateVectorSlotInput {
  @Field({ nullable: true })
  public applicableTime?: Date;

  @Field({ nullable: true })
  public base?: string;

  @Field({ nullable: true })
  public collectionName?: string;

  @Field({ nullable: true })
  public endTdt?: string;

  @Field({ nullable: true })
  public head?: string;

  @Field({ nullable: true })
  public gravitationalParameterM3PerS2: string;

  @Field(() => GraphQLJSON, { nullable: true })
  public initialPositionCoefficientsM?: {};

  @Field(() => GraphQLJSON, { nullable: true })
  public initialVelocityCoefficientsMps?: {};

  @Field({ nullable: true })
  public order?: string;

  @Field()
  public vectorSlot!: string;

  @Field({ nullable: true })
  public startTdt?: string;

  @Field(() => STATUS)
  public status!: STATUS;

  @Field(() => TYPE, { nullable: true })
  public type?: TYPE;

  @Field(() => VECTOR_SLOT_VALUE_TYPE, { nullable: true })
  public valueType?: VECTOR_SLOT_VALUE_TYPE;

  @Field({ nullable: true })
  public validityTime?: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  public xyzCoefficients?: {};
}
