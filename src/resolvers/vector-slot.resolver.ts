import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { MoreThanOrEqual } from 'typeorm';

import { createVectorSlotsInput } from '../inputs';
import { VectorSlot } from '../models';
import { Response } from '../responses';

@Resolver(() => VectorSlot)
export class VectorSlotResolver {
  @Mutation(() => Response)
  public async createVectorSlots(@Arg('data') data: createVectorSlotsInput): Promise<Response> {
    try {
      VectorSlot.create(data.vectorSlots).every((vectorSlot) => vectorSlot.save());

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

  @Query(() => [VectorSlot])
  public async vectorSlotsByTime(@Arg('scet') scet: Date): Promise<VectorSlot[]> {
    return VectorSlot.createQueryBuilder('vector_slot')
      .groupBy('vector_slot.slot')
      .where({ startTdt: MoreThanOrEqual(scet) })
      .orderBy('vector_slot.startTdt', 'ASC')
      .addOrderBy('vector_slot.order', 'ASC')
      .addOrderBy('vector_slot.slot', 'ASC')
      .getMany();
  }
}
