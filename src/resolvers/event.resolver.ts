import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import Container from 'typedi';
import { getConnection } from 'typeorm';

import { DateArgs, NameDateArgs } from '../args';
import { CreateEventsInput } from '../inputs';
import { Event } from '../models';
import { SharedRepository } from '../repositories';
import { Response } from '../responses';
import { ValidationService } from '../services';

@Resolver(() => Event)
export class EventResolver {
  private sharedRepository: SharedRepository<Event>;

  constructor(private validationService: ValidationService) {
    this.validationService = Container.get(ValidationService);
    this.sharedRepository = new SharedRepository<Event>(getConnection(), Event);
  }

  @Mutation(() => Response)
  public async createEvents(@Arg('data') data: CreateEventsInput): Promise<Response> {
    try {
      const events = Event.create(data.events);

      const { errorMessage, valid } = this.validationService.validateEventTypes(events);

      if (!valid && errorMessage) {
        return {
          message: errorMessage,
          success: valid
        };
      }

      await getConnection().createQueryBuilder().insert().into(Event).values(events).execute();

      return {
        message: `${events.length} Events imported`,
        success: true
      };
    } catch (error) {
      return {
        message: 'Event creation failed',
        success: false
      };
    }
  }

  @Mutation(() => Response)
  public async deleteEvents(
    @Arg('collectionName') collectionName: string,
    @Arg('names', () => [String]) names: string[]
  ): Promise<Response> {
    try {
      const events = await Event.createQueryBuilder()
        .delete()
        .where('collectionName = :collectionName AND name IN (:...names)', {
          collectionName,
          names
        })
        .execute();

      return {
        message: `Successfully deleted ${events.affected} of ${names.length} Events in ${collectionName}`,
        success: true
      };
    } catch (error) {
      return {
        message: `Failed to delete Events in collectionName ${collectionName}`,
        success: false
      };
    }
  }

  @Mutation(() => Response)
  public async deleteEventsByCollection(
    @Arg('collectionName') collectionName: string
  ): Promise<Response> {
    try {
      const events = await Event.delete({ collectionName });

      return {
        message: `Successfully deleted ${events.affected} Events in ${collectionName}`,
        success: true
      };
    } catch (error) {
      return {
        message: `Failed to delete Events in collectionName ${collectionName}`,
        success: false
      };
    }
  }

  @Mutation(() => Response)
  public async deleteEventsByType(
    @Arg('collectionName') collectionName: string,
    @Arg('type') type: string
  ): Promise<Response> {
    try {
      const events = await Event.delete({ collectionName, type });

      return {
        message: `Successfully deleted ${events.affected} Events matching ${type} in collectionName ${collectionName}`,
        success: true
      };
    } catch (error) {
      return {
        message: `Failed to delete Events matching ${type} in collectionName ${collectionName}`,
        success: false
      };
    }
  }

  @Query(() => [Event])
  public events(@Arg('collectionName') collectionName: string): Promise<Event[]> {
    return Event.find({
      where: {
        collectionName
      }
    });
  }

  @Query(() => [Event])
  public eventsBetweenErts(
    @Arg('collectionName') collectionName: string,
    @Args() dateArgs: DateArgs
  ): Promise<Event[]> {
    return this.sharedRepository.betweenErts(collectionName, dateArgs);
  }

  @Query(() => [Event])
  public eventsBetweenScets(
    @Arg('collectionName') collectionName: string,
    @Args() dateArgs: DateArgs
  ): Promise<Event[]> {
    return this.sharedRepository.betweenScets(collectionName, dateArgs);
  }

  @Query(() => [Event])
  public eventsByName(
    @Arg('collectionName') collectionName: string,
    @Arg('name') name: string
  ): Promise<Event[]> {
    return this.sharedRepository.byName(collectionName, name);
  }

  @Query(() => [Event])
  public async eventsByNameBetweenDates(
    @Arg('collectionName') collectionName: string,
    @Args() nameDateArgs: NameDateArgs
  ): Promise<Event[]> {
    return this.sharedRepository.byNameBetweenDates(collectionName, nameDateArgs);
  }
}
