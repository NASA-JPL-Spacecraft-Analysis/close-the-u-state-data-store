import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

import { DateArgs, NameDateArgs } from '../args';
import { CreateEventsInput } from '../inputs';
import { Event } from '../models';
import { SharedRepository } from '../repositories';
import { Response } from '../responses';

@Resolver(() => Event)
export class EventResolver {
  private sharedRepository: SharedRepository<Event>;

  constructor() {
    this.sharedRepository = new SharedRepository<Event>(getConnection(), Event);
  }

  @Mutation(() => Response)
  public async createEvents(@Arg('data') data: CreateEventsInput): Promise<Response> {
    try {
      const events = Event.create(data.events);
      const promises = [];

      for (const event of events) {
        promises.push(event.save());
      }

      return Promise.all(promises).then(() => {
        return {
          message: 'Events created',
          success: true
        };
      });
    } catch (error) {
      return {
        message: 'Event creation failed',
        success: false
      };
    }
  }

  @Query(() => [ Event ])
  public events(): Promise<Event[]> {
    return Event.find();
  }

  @Query(() => [ Event ])
  public eventsBetweenErts(@Args() dateArgs: DateArgs): Promise<Event[]> {
    return this.sharedRepository.betweenErts(dateArgs);
  }

  @Query(() => [ Event ])
  public eventsBetweenScets(@Args() dateArgs: DateArgs): Promise<Event[]> {
    return this.sharedRepository.betweenScets(dateArgs);
  }

  @Query(() => [ Event ])
  public eventByCollectionId(@Arg('name') collectionId: string): Promise<Event[]> {
    return this.sharedRepository.byName(collectionId);
  }

  @Query(() => [ Event ])
  public eventsByName(@Arg('name') name: string): Promise<Event[]> {
    return this.sharedRepository.byName(name);
  }

  @Query(() => [ Event ])
  public async eventsByNameBetweenDates(@Args() nameDateArgs: NameDateArgs): Promise<Event[]> {
    return this.sharedRepository.byNameBetweenDates(nameDateArgs);
  }
}
