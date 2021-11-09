import GraphQLJSON from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRecordInput {
  @Field({ nullable: true })
  public ert?: Date;

  @Field()
  public name!: string;

  @Field(() => Date)
  public scet!: Date;

  @Field(() => GraphQLJSON, { nullable: true })
  public metadata?: {};

  @Field({ nullable: true })
  public planId?: string;

  @Field({ nullable: true })
  public runId?: string;

  @Field({ nullable: true })
  public sessionId?: string;

  @Field()
  public value!: number;
}
