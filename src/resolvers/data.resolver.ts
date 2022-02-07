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
  public dataBetweenErts(@Args() dateArgs: DateArgs): Promise<Data[]> {
    return this.sharedRepository.betweenErts(dateArgs);
  }

  @Query(() => [ Data ])
  public async dataBetweenScets(@Args() dateArgs: DateArgs): Promise<Data[]> {
    return this.sharedRepository.betweenScets(dateArgs);
  }

  @Query(() => [ Data ])
  public dataByCollectionId(@Arg('name') collectionId: string): Promise<Data[]> {
    return this.sharedRepository.byName(collectionId);
  }

  @Query(() => [ Data ])
  public dataByName(@Arg('name') name: string): Promise<Data[]> {
    return this.sharedRepository.byName(name);
  }

  @Query(() => [ Data ])
  public async dataByNameBetweenDates(@Args() nameDateArgs: NameDateArgs): Promise<Data[]> {
    return this.sharedRepository.byNameBetweenDates(nameDateArgs);
  }
}
