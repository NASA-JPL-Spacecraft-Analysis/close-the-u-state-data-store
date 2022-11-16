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
  public data(@Arg('collectionName') collectionName: string): Promise<Data[]> {
    return Data.find({
        where: {
          collectionName
        }
    });
  }

  @Query(() => [ Data ])
  public dataBetweenErts(@Arg('collectionName') collectionName: string, @Args() dateArgs: DateArgs): Promise<Data[]> {
    return this.sharedRepository.betweenErts(collectionName, dateArgs);
  }

  @Query(() => [ Data ])
  public async dataBetweenScets(@Arg('collectionName') collectionName: string, @Args() dateArgs: DateArgs): Promise<Data[]> {
    return this.sharedRepository.betweenScets(collectionName, dateArgs);
  }

  @Query(() => [ Data ])
  public dataByName(@Arg('collectionName') collectionName: string, @Arg('name') name: string): Promise<Data[]> {
    return this.sharedRepository.byName(collectionName, name);
  }

  @Query(() => [ Data ])
  public async dataByNameBetweenDates(@Arg('collectionName') collectionName: string, @Args() nameDateArgs: NameDateArgs): Promise<Data[]> {
    return this.sharedRepository.byNameBetweenDates(collectionName, nameDateArgs);
  }

  @Query(() => [ Data ])
  public async dataByApplicableTime(@Arg('collectionName') collectionName: string, @Arg('name') name: string, @Arg('scet') scet: Date): Promise<Data[]> {
    return this.sharedRepository.byApplicableTime(collectionName, name, scet);
  }
}
