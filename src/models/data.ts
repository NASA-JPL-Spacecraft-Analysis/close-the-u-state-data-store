import { Field, ObjectType } from 'type-graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('data')
@ObjectType()
export class Data extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  public ert?: Date;

  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id!: string;

  @Column()
  @Field()
  public name!: string;

  @Column({ type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  public metadata?: {};

  @Column({ nullable: true })
  @Field({ nullable: true })
  public planId?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public runId?: string;

  @Column()
  @Field()
  public scet!: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public sessionId?: string;

  @Column()
  @Field()
  public value!: number;
}
