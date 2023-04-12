import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import Container from 'typedi';
import { Between, getConnection, In } from 'typeorm';

import { State } from '../models';
import { DateArgs, NameDateArgs } from '../args';
import { Response } from '../responses';
import { CreateStatesInput } from '../inputs';
import { SharedRepository } from '../repositories';
import { ValidationService } from '../services';
import { STATE_TYPES } from '../constants';
import { UserInputError } from 'apollo-server-core';

@Resolver(() => State)
export class StateResolver {
  private sharedRepository: SharedRepository<State>;

  constructor(
    private validationService: ValidationService
  ) {
    this.validationService = Container.get(ValidationService);
    this.sharedRepository = new SharedRepository<State>(getConnection(), State);
  }

  @Mutation(() => Response)
  public async createStates(@Arg('data') data: CreateStatesInput): Promise<Response> {
    try {
      const states = State.create(data.states);
      const promises = [];

      const { errorMessage, valid } = this.validationService.validateTypes(states, STATE_TYPES);

      if (!valid && errorMessage) {
        return {
          message: errorMessage,
          success: valid
        };
      }

      for (const state of states) {
        promises.push(state.save());
      }

      return Promise.all(promises).then(() => {
        return {
          message: 'State imported',
          success: true
        };
      });
    } catch (error) {
      return {
        message: 'State failed to import',
        success: false
      };
    }
  }

  @Query(() => [ State ])
  public state(@Arg('collectionName') collectionName: string): Promise<State[]> {
    return State.find({
        where: {
          collectionName
        }
    });
  }

  @Query(() => [ State ])
  public stateBetweenErts(@Arg('collectionName') collectionName: string, @Args() dateArgs: DateArgs): Promise<State[]> {
    return this.sharedRepository.betweenErts(collectionName, dateArgs);
  }

  @Query(() => [ State ])
  public async stateBetweenScets(@Arg('collectionName') collectionName: string, @Args() dateArgs: DateArgs): Promise<State[]> {
    return this.sharedRepository.betweenScets(collectionName, dateArgs);
  }

  @Query(() => [ State ])
  public stateByName(@Arg('collectionName') collectionName: string, @Arg('name') name: string): Promise<State[]> {
    return this.sharedRepository.byName(collectionName, name);
  }

  @Query(() => [ State ])
  public async stateByNameBetweenDates(@Arg('collectionName') collectionName: string, @Args() nameDateArgs: NameDateArgs): Promise<State[]> {
    return this.sharedRepository.byNameBetweenDates(collectionName, nameDateArgs);
  }

  @Query(() => [ State ])
  public async stateByApplicableTime(@Arg('collectionName') collectionName: string, @Arg('name') name: string, @Arg('scet') scet: Date): Promise<State[]> {
    return this.sharedRepository.byApplicableTime(collectionName, name, scet);
  }

  @Query(() => [ State ])
  public async stateByCollectionNameAndStateNames(
    @Arg('collectionName', () => String) collectionName: string,
    @Arg('stateNames', () => [ String ]) stateNames: string[],
    @Arg('start', {nullable: true}) start: Date,
    @Arg('end', { nullable: true}) end: Date
  ): Promise<State[]> {
    if ((start && !end) || (!start && end)) {
      throw new UserInputError('Please provide a valid start and end time');
    }

    if (start && end) {
      return await State.find({
        where: {
          collectionName,
          name: In(stateNames),
          scet: Between(start, end)
        },
        order: {
          scet: 'ASC'
        }
      });
    }

    return await State.find({
      where: {
        collectionName,
        name: In(stateNames)
      },
      order: {
        scet: 'ASC'
      }
    });
  }
}
