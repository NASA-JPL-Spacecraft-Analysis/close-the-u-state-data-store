import { Field, ObjectType } from 'type-graphql';
import { Column } from 'typeorm';

@ObjectType()
export class Vector {
  @Column()
  @Field(() => [String])
  public xCoefficients!: string[];

  @Column()
  @Field(() => [String])
  public yCoefficients!: string[];

  @Column()
  @Field(() => [String])
  public zCoefficients!: string[];
}
