import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateEventsInput } from '../inputs';

import { Event } from '../models';
import { Response } from '../responses';

@Resolver(() => Event)
export class EventResolver {
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
  public eventsByErt(@Arg('ert') ert: string): Promise<Event[]> {
    return Event.find({
      where: {
        ert
      }
    });
  }
}
