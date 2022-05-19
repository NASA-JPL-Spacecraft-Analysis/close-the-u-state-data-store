import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vector_slot')
@ObjectType()
export class VectorSlot extends BaseEntity {
  @Column()
  @Field()
  public applicableTime!: Date;

  @Column()
  @Field()
  public base!: string;

  @Column()
  @Field()
  public head!: string;

  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id!: string;

  @Column()
  @Field()
  public slot!: number;
}
