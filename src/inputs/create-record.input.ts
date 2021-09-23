import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRecordInput {
  @Field()
  public name!: string;

  @Field(() => Date)
  public scet!: Date;

  @Field()
  public value!: number;
}
