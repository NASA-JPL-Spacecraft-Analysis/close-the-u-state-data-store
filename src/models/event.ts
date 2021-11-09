import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
@ObjectType()
export class Event extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  public ert?: Date;

  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public message?: string;

  @Column()
  @Field()
  public name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public planId?: string;

  @Column()
  @Field()
  public recordType!: string;
  
  @Column()
  @Field()
  public scet!: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public scetEnd?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public sessionId?: string;
}
