import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Between } from 'typeorm';

import { Data } from '../models';
import { DateArgs, NameDateArgs } from '../args';
import { Response } from '../responses';
import { CreateRecordsInput } from '../inputs';

@Resolver(() => Data)
export class DataResolver {
  @Mutation(() => Response)
  public async createRecords(@Arg('data') data: CreateRecordsInput): Promise<Response> {
    try {
      const records = Data.create(data.records);
      const promises = [];

      for (const record of records) {
        promises.push(record.save());
      }

      return Promise.all(promises).then(() => {
        return {
          message: 'Data imported',
          success: true
        };
      });
    } catch (error) {
      return {
        message: 'Data failed to import',
        success: false
      };
    }
  }

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
    return Data.find({
      where: {
        scet: Between(start, end)
      }
    })
  }

  @Query(() => [ Data ])
  public dataBetweenErts(@Args() { start, end }: DateArgs): Promise<Data[]> {
    return Data.find({
      where: {
        ert: Between(start, end)
      }
    });
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
    return Data.find({
      where: {
        scet: Between(start, end),
        name
      }
    })
  }
}
