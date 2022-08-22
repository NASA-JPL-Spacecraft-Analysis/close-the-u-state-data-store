import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import Container from 'typedi';
import { getConnection } from 'typeorm';

import { Data } from '../models';
import { DateArgs, NameDateArgs } from '../args';
import { Response } from '../responses';
import { CreateRecordsInput } from '../inputs';
import { SharedRepository } from '../repositories';
import { ValidationService } from '../services';
import { DATA_TYPES } from '../constants';

@Resolver(() => Data)
export class DataResolver {
  private sharedRepository: SharedRepository<Data>;

  constructor(
    private validationService: ValidationService
  ) {
    this.validationService = Container.get(ValidationService);
    this.sharedRepository = new SharedRepository<Data>(getConnection(), Data);
  }

  @Mutation(() => Response)
  public async createRecords(@Arg('data') data: CreateRecordsInput): Promise<Response> {
    try {
      const records = Data.create(data.records);
      const promises = [];

      const { errorMessage, valid } = this.validationService.validateTypes(records, DATA_TYPES);

      if (!valid && errorMessage) {
        return {
          message: errorMessage,
          success: valid
        };
      }

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

  @Query(() => [ Data ])
  public dataBetweenErts(@Arg('collectionId') collectionId: string, @Args() dateArgs: DateArgs): Promise<Data[]> {
    return this.sharedRepository.betweenErts(collectionId, dateArgs);
  }

  @Query(() => [ Data ])
  public async dataBetweenScets(@Arg('collectionId') collectionId: string, @Args() dateArgs: DateArgs): Promise<Data[]> {
    return this.sharedRepository.betweenScets(collectionId, dateArgs);
  }

  @Query(() => [ Data ])
  public dataByName(@Arg('collectionId') collectionId: string, @Arg('name') name: string): Promise<Data[]> {
    return this.sharedRepository.byName(collectionId, name);
  }

  @Query(() => [ Data ])
  public async dataByNameBetweenDates(@Arg('collectionId') collectionId: string, @Args() nameDateArgs: NameDateArgs): Promise<Data[]> {
    return this.sharedRepository.byNameBetweenDates(collectionId, nameDateArgs);
  }
}
