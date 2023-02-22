import { Query, Resolver } from 'type-graphql';

import { Data, Event } from '../models';

@Resolver()
export class NodeResolver {
  @Query(() => [ String ])
  public async collectionNames(): Promise<string[]> {
    const data = await Data.createQueryBuilder('data').select('DISTINCT data.collectionName', 'collectionName').getRawMany();
    const event = await Event.createQueryBuilder('event').select('DISTINCT event.collectionName', 'collectionName').getRawMany();

    // Create a distinct list of collection names sorted alphabetically.
    return [...new Set(data.concat(event).map(item => item.collectionName))].sort();
  }
}
