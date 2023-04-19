import GraphQLJSON from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

import { VALUE_TYPE, VOLATILITY } from '../constants'

@InputType()
export class CreateStateInput {
  @Field({ nullable: true })
  public collectionName?: string;

  @Field({ nullable: true })
  public cpu?: string;

  @Field({ nullable: true })
  public ert?: Date;

  @Field({ nullable: true })
  public hexId?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  public metadata?: {};

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public planId?: string;

  @Field({ nullable: true })
  public runId?: string;

  @Field()
  public scet!: Date;

  @Field({ nullable: true })
  public scetEnd?: Date;

  @Field({ nullable: true })
  public sessionId?: string;

  @Field({ nullable: true })
  public type?: string

  @Field()
  public value!: number;

  @Field(() => VALUE_TYPE)
  public valueType?: VALUE_TYPE;

  @Field({ nullable: true })
  public version?: string;

  @Field(() => VOLATILITY)
  public volatility?: VOLATILITY;
}
