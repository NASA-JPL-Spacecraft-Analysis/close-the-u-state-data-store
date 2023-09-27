import { Arg, Mutation, Query, Resolver } from 'type-graphql';

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
    const vectorSlots = await VectorSlot.find({ order: { applicableTime: 'DESC' } });

    for (const vs of vectorSlots) {
      const applicableTime = vs.applicableTime;
      const existingApplicableTime = slots[vs.vectorSlot]?.applicableTime;

      /**
       * If we haven't come across a slot yet, populate it otherwise:
       * 1. If the applicableTime is before the query time
       * 2. And the applicableTime is newer than the existing record for that slot
       *
       * Then we return the slot value.
       */
      if (
        slots[vs.vectorSlot] === undefined ||
        (applicableTime !== undefined &&
          existingApplicableTime !== undefined &&
          applicableTime.getTime() <= scet.getTime() &&
          existingApplicableTime.getTime() > scet.getTime())
      ) {
        slots[vs.vectorSlot] = vs;
      }
    }

    return Object.values(slots).sort((a, b) => Number(a.vectorSlot) - Number(b.vectorSlot));
  }
}
