import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Node extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  public collectionId?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public ert?: Date;

  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id!: string;

  @Column()
  @Field()
  public name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public planId?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public runId?: string;
  
  @Column()
  @Field()
  public scet!: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public scetEnd?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public sessionId?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public type?: string
}
