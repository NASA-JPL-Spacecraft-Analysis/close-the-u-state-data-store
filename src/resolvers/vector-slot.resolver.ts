import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

import { createVectorSlotsInput } from '../inputs';
import { VectorSlot } from '../models';
import { Response } from '../responses';

@Resolver(() => VectorSlot)
export class VectorSlotResolver {
  @Mutation(() => Response)
  public async createVectorSlots(@Arg('data') data: createVectorSlotsInput): Promise<Response> {
    try {
      const vectorSlots = VectorSlot.create(data.vectorSlots);

      await getConnection().createQueryBuilder().insert().into(VectorSlot).values(vectorSlots).execute();

      return {
        message: 'Vector Slots imported',
        success: true
      };
    } catch (error) {
      return {
        message: 'Vector slots failed to import',
        success: false
      };
    }
  }

  @Query(() => [VectorSlot])
  public vectorSlots(): Promise<VectorSlot[]> {
    return VectorSlot.find();
  }
}
