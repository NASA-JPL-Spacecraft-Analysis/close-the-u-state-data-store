import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import Container from 'typedi';
import { getConnection } from 'typeorm';

import { DateArgs, NameDateArgs } from '../args';
import { EVENT_TYPES } from '../constants';
import { CreateEventsInput } from '../inputs';
import { Event } from '../models';
import { SharedRepository } from '../repositories';
import { Response } from '../responses';
import { ValidationService } from '../services';

@Resolver(() => Event)
export class EventResolver {
  private sharedRepository: SharedRepository<Event>;

  constructor(
    private validationService: ValidationService
  ) {
    this.validationService = Container.get(ValidationService);
    this.sharedRepository = new SharedRepository<Event>(getConnection(), Event);
  }

  @Mutation(() => Response)
  public async createEvents(@Arg('data') data: CreateEventsInput): Promise<Response> {
    try {
      const events = Event.create(data.events);
      const promises = [];

      const { errorMessage, valid } = this.validationService.validateTypes(events, EVENT_TYPES);

      if (!valid && errorMessage) {
        return {
          message: errorMessage,
          success: valid
        };
      }

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
  public eventsBetweenErts(@Arg('collectionId') collectionId: string, @Args() dateArgs: DateArgs): Promise<Event[]> {
    return this.sharedRepository.betweenErts(collectionId, dateArgs);
  }

  @Query(() => [ Event ])
  public eventsBetweenScets(@Arg('collectionId') collectionId: string, @Args() dateArgs: DateArgs): Promise<Event[]> {
    return this.sharedRepository.betweenScets(collectionId, dateArgs);
  }

  @Query(() => [ Event ])
  public eventsByName(@Arg('collectionId') collectionId: string, @Arg('name') name: string): Promise<Event[]> {
    return this.sharedRepository.byName(collectionId, name);
  }

  @Query(() => [ Event ])
  public async eventsByNameBetweenDates(@Arg('collectionId') collectionId: string, @Args() nameDateArgs: NameDateArgs): Promise<Event[]> {
    return this.sharedRepository.byNameBetweenDates(collectionId, nameDateArgs);
  }
}
