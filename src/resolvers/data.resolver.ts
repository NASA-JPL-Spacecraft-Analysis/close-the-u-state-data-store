import { Arg, Args, Query, Resolver } from 'type-graphql';
import { zonedTimeToUtc } from 'date-fns-tz'

import { Data } from '../models';
import { DateArgs, NameDateArgs } from '../args';

@Resolver(() => Data)
export class DataResolver {
  @Query(() => [ Data ])
  public data(): Promise<Data[]> {
    return Data.find();
  }

  /**
   * Gets a list of items that are between 2 dates.
   * @returns a list of data.
   */
  @Query(() => [ Data ])
  public async dataBetweenDates(@Args() { start, end }: DateArgs): Promise<Data[]> {
    return this.filterBetweenDates(await this.data(), start, end);
  }

  @Query(() => [ Data ])
  public dataByName(@Arg('name') name: string): Promise<Data[]> {
    return Data.find({
      where: {
        name
      }
    });
  }

  @Query(() => [ Data ])
  public async dataByNameBetweenDates(@Args() { name, start, end }: NameDateArgs): Promise<Data[]> {
    return this.filterBetweenDates(await this.dataByName(name), start, end);
  }

  private filterBetweenDates(data: Data[], start: Date, end: Date): Data[] {
    const itemsBetween: Data[] = [];

    for (const item of data) {
      const convertedScet = zonedTimeToUtc(item.scet, 'UTC');

      if (convertedScet >= start && convertedScet <= end) {
        itemsBetween.push(item);
      }
    }

    return itemsBetween;
  }
}
