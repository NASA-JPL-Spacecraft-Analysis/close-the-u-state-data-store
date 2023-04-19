import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Node } from './node';
import { VALUE_TYPE, VOLATILITY } from '../constants'


@Entity('states')
@ObjectType()
export class State extends Node {
    @Column()
    @Field()
    public cpu!: string;

    @Column()
    @Field()
    public hexId!: string;

    @Column()
    @Field()
    public value!: number;

    @Column()
    @Field()
    public valueType!: VALUE_TYPE;

    @Column()
    @Field()
    public version!: number;

    @Column()
    @Field()
    public volatility!: VOLATILITY;
}
