import { Field, ObjectType } from 'type-graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Column, Entity } from 'typeorm';

import { Node } from './node';

@Entity('data')
@ObjectType()
export class Data extends Node {
  @Column({ type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  public metadata?: {};

  @Column()
  @Field()
  public value!: number;
}
