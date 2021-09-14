import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('data')
@ObjectType()
export class Data extends BaseEntity {
  @Column()
  @Field()
  public name!: string;

  @PrimaryColumn()
  @Field()
  public scet!: Date;

  @Column()
  @Field()
  public value!: number;
}
