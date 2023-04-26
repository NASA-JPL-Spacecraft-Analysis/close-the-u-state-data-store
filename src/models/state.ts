import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Node } from './node';

@Entity('states')
@ObjectType()
export class State extends Node {
    @Column()
    @Field()
    public value!: number;
}
