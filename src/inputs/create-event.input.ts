import GraphQLJSON from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateEventInput {
  @Field({ nullable: true })
  public collectionName?: string;

  @Field({ nullable: true })
  public ert?: Date;

  @Field({ nullable: true })
  public message?: string;

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
}
