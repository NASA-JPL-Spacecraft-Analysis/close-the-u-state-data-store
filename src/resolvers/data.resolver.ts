import { Arg, Query, Resolver } from 'type-graphql';

import { Data } from '../models';

@Resolver(() => Data)
export class DataResolver {
  @Query(() => [ Data ])
  public data(): Promise<Data[]> {
    return Data.find();
  }

  @Query(() => [ Data ])
  public dataByName(@Arg('name') name: string): Promise<Data[]> {
    return Data.find({
      where: {
        name
      }
    });
  }
}
