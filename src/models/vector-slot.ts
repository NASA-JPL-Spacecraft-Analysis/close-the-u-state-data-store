import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import GraphQLJSON from 'graphql-type-json';

import { Vector } from './vector';

export enum TYPE {
  CONIC = 'CONIC',
  FIXED = 'FIXED',
  POLY = 'POLY'
}

registerEnumType(TYPE, { name: 'TYPE' });

export enum STATUS {
  ADDED = 'ADDED',
  DELETED = 'DELETED',
  REPLACED = 'REPLACED'
}

registerEnumType(STATUS, { name: 'STATUS' });

// TODO: This should be renamed, consult with @dan.
export enum VECTOR_SLOT_VALUE_TYPE {
  PLANNED = 'PLANNED',
  MEASURED = 'MEASURED'
}

registerEnumType(VECTOR_SLOT_VALUE_TYPE, { name: 'VECTOR_SLOT_VALUE_TYPE' });

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
  @Field(() => STATUS)
  public status!: STATUS;

  @Column()
  @Field(() => TYPE)
  public type!: TYPE;

  @Column()
  @Field(() => VECTOR_SLOT_VALUE_TYPE)
  public valueType!: VECTOR_SLOT_VALUE_TYPE;

  @Column({ type: 'json' })
  @Field(() => GraphQLJSON)
  public vector!: Vector;

  @Column()
  @Field()
  public vectorSlot!: string;
}
