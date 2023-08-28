import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Vector } from './vector';
import GraphQLJSON from 'graphql-type-json';

@Entity('vector_slot')
@ObjectType()
export class VectorSlot extends BaseEntity {
  @Column()
  @Field()
  public base!: string;

  @Column()
  @Field()
  public endTdt!: Date;

  @Column()
  @Field()
  public head!: string;

  @PrimaryGeneratedColumn('uuid')
  @Field()
  public id!: string;

  @Column()
  @Field()
  public order!: string;

  @Column()
  @Field()
  public startTdt!: Date;

  @Column()
  @Field()
  public status!: string;

  @Column()
  @Field()
  public type!: string;

  @Column({ type: 'json' })
  @Field(() => GraphQLJSON)
  public vector!: Vector;

  @Column()
  @Field()
  public vectorSlot!: string;
}
