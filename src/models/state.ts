import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Node } from './node';
import { VALUE_TYPE, VOLATILITY } from '../constants'


@Entity('states')
@ObjectType()
export class State extends Node {
    @Column({ nullable: true })
    @Field({ nullable: true })
    public cpu?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    public hexId?: string;

    @Column()
    @Field()
    public value!: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    public valueType!: VALUE_TYPE;

    @Column({ nullable: true })
    @Field({ nullable: true })
    public version?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    public volatility?: VOLATILITY;
}
