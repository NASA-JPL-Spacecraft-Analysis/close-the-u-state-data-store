import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateVectorSlotInput {
  @Field()
  public applicableTime!: Date;

  @Field()
  public base!: string;

  @Field()
  public head!: string;

  @Field()
  public slot!: number;
}
