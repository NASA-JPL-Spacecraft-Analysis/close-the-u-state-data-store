import { Query, Resolver } from 'type-graphql';

import { Data } from '../models';

@Resolver(() => Data)
export class DataResolver {
  @Query(() => [ Data ])
  public data(): Promise<Data[]> {
    return Data.find();
  }
}
