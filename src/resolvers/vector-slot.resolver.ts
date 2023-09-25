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
    const slots: Record<string, VectorSlot> = {};
    const vectorSlots = await VectorSlot.find();

    for (const vs of vectorSlots) {
      const startTdt = vs.startTdt;
      const existingStartTdt = slots[vs.vectorSlot]?.startTdt;

      /**
       * If we haven't come across a slot yet, populate it otherwise:
       * 1. If the startTdt is before the query time
       * 2. And the startTdt is newer than the existing record for that slot
       *
       * Then we return the slot value.
       */
      if (
        slots[vs.vectorSlot] === undefined ||
        (startTdt !== undefined &&
          existingStartTdt !== undefined &&
          startTdt.getTime() <= scet.getTime() &&
          startTdt.getTime() > existingStartTdt.getTime())
      ) {
        slots[vs.vectorSlot] = vs;
      }
    }

    return Object.values(slots).sort((a, b) => Number(a.vectorSlot) - Number(b.vectorSlot));
  }
}
