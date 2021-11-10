import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateEventInput {
  @Field({ nullable: true })
  public ert?: Date;

  @Field({ nullable: true })
  public message?: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public planId?: string;

  @Field()
  public recordType!: string;
  
  @Field()
  public scet!: Date;

  @Field({ nullable: true })
  public scetEnd?: Date;

  @Field({ nullable: true })
  public sessionId?: string;
}
