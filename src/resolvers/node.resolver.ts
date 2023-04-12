import { Query, Resolver } from 'type-graphql';

import { State, Event } from '../models';

@Resolver()
export class NodeResolver {
  @Query(() => [ String ])
  public async collectionNames(): Promise<string[]> {
    const state = await State.createQueryBuilder('state').select('DISTINCT state.collectionName', 'collectionName').getRawMany();
    const event = await Event.createQueryBuilder('event').select('DISTINCT event.collectionName', 'collectionName').getRawMany();

    // Create a distinct list of collection names sorted alphabetically.
    return [...new Set(state.concat(event).map(item => item.collectionName))].sort();
  }
}
