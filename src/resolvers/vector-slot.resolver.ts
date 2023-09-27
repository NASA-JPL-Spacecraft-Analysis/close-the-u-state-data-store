import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { createVectorSlotsInput } from '../inputs';
import { VectorSlot } from '../models';
import { Response } from '../responses';
import { LessThan, LessThanOrEqual } from 'typeorm';

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

  @Mutation(() => Response)
  public async deleteVectorSlots(@Arg('collectionName') collectionName: string) {
    try {
      const vectorSlots = await VectorSlot.createQueryBuilder()
        .delete()
        .where('collectionName = :collectionName', { collectionName })
        .execute();

      return {
        message: `Successfully deleted ${vectorSlots.affected} Vector Slots in ${collectionName}`,
        success: true
      };
    } catch (error) {
      return {
        message: `Failed to delete Vector Slots in collectionName: ${collectionName}`,
        success: false
      };
    }
  }

  @Query(() => [VectorSlot])
  public vectorSlots(
    @Arg('collectionName', { nullable: true }) collectionName: string
  ): Promise<VectorSlot[]> {
    if (collectionName !== undefined) {
      return VectorSlot.find({ where: { collectionName } });
    }

    return VectorSlot.find();
  }

  @Query(() => [VectorSlot])
  public async vectorSlotsByTime(
    @Arg('scet') scet: Date,
    @Arg('collectionName') collectionName: string
  ): Promise<VectorSlot[]> {
    const vectorSlots = await VectorSlot.find({
      where: { applicableTime: LessThanOrEqual(scet), collectionName }
    });

    const vectorSlotMap: Record<string, VectorSlot> = {};

    vectorSlots.forEach((vs) => {
      const existingSlot = vectorSlotMap[vs.vectorSlot];

      if (
        existingSlot === undefined ||
        (existingSlot !== undefined &&
          vs.applicableTime !== undefined &&
          existingSlot.applicableTime !== undefined &&
          vs.applicableTime > existingSlot.applicableTime)
      ) {
        vectorSlotMap[vs.vectorSlot] = vs;
      }
    });

    return Object.values(vectorSlotMap).sort((a, b) => Number(a.vectorSlot) - Number(b.vectorSlot));
  }
}
