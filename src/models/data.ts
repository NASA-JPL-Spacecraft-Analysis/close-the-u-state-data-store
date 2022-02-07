import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Node } from './node';

@Entity('data')
@ObjectType()
export class Data extends Node {
  @Column()
  @Field()
  public value!: number;
}
