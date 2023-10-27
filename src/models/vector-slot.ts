import GraphQLJSON from 'graphql-type-json';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TYPE {
  CONIC = 'CONIC',
  FIXED = 'FIXED',
  POLY = 'POLY'
}
registerEnumType(TYPE, { name: 'TYPE' });

export enum STATUS {
  added = 'added',
  deleted = 'deleted',
  empty = 'empty',
  replacement = 'replacement',
  unchanged = 'unchanged'
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
  @Column({ nullable: true })
  @Field({ nullable: true })
  public applicableTime?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public base?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public collectionName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public endTdt?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public head?: string;

  @Column({ name: 'gravitational_parameter_m3_per_s2', nullable: true })
  @Field({ nullable: true })
  public gravitationalParameterM3PerS2?: string;

  @PrimaryGeneratedColumn('uuid')
  @Field()
  public id!: string;

  @Column({ name: 'initial_position_coefficients_m', type: 'json', nullable: true })
  @Field({ nullable: true })
  public initialPositionCoefficientsM?: string;

  @Column({ name: 'initial_velocity_coefficients_mps', type: 'json', nullable: true })
  @Field({ nullable: true })
  public initialVelocityCoefficientsMps?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public order?: string;

  @Column()
  @Field()
  public vectorSlot!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public startTdt?: string;

  @Column()
  @Field(() => STATUS)
  public status!: STATUS;

  @Column({ nullable: true })
  @Field(() => TYPE, { nullable: true })
  public type?: TYPE;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public validityTime?: Date;

  @Column({ nullable: true })
  @Field(() => VECTOR_SLOT_VALUE_TYPE, { nullable: true })
  public valueType?: VECTOR_SLOT_VALUE_TYPE;

  @Column({ name: 'x_coefficients', type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  public xCoefficients?: string[];

  @Column({ name: 'y_coefficients', type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  public yCoefficients?: string[];

  @Column({ name: 'z_coefficients', type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  public zCoefficients?: string[];

  @Column({ name: 'xyz_coefficients', type: 'json', nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  public xyzCoefficients?: string;
}
