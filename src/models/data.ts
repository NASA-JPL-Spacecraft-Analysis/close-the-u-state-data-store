import { Field, ObjectType } from 'type-graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('data')
@ObjectType()
export class Data extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  public ert?: Date;

  @Column()
  @Field()
  public name!: string;

  @PrimaryColumn()
  @Field()
  public scet!: Date;

  @Column()
  @Field()
  public value!: number;

  @Column({ type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  public metadata?: {};

  @Column({ nullable: true })
  @Field({ nullable: true })
  public runId?: string;
}
