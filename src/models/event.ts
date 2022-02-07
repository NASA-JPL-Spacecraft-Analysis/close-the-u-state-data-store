import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Node } from './node';

@Entity('events')
@ObjectType()
export class Event extends Node {
  @Column({ nullable: true })
  @Field({ nullable: true })
  public message?: string;
}
