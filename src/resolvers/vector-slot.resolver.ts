import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { createVectorSlotsInput } from '../inputs';
import { STATUS, VECTOR_SLOT_VALUE_TYPE, VectorSlot } from '../models';
import { Response } from '../responses';
import { LessThanOrEqual, getConnection } from 'typeorm';

@Resolver(() => VectorSlot)
export class VectorSlotResolver {
  @Mutation(() => Response)
  public async createVectorSlots(@Arg('data') data: createVectorSlotsInput): Promise<Response> {
    try {
      const vectorSlots = VectorSlot.create(data.vectorSlots);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(VectorSlot)
        .values(vectorSlots)
        .execute();

      return {
        message: `${vectorSlots.length} Vector Slots imported`,
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

      if (vectorSlots.affected === 0) {
        return {
          message: `${vectorSlots.affected} Vector Slots were deleted in ${collectionName}`,
          success: false
        };
      }

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

  @Mutation(() => Response)
  public async deleteVectorSlotsByTime(
    @Arg('collectionName') collectionName: string,
    @Arg('valueType', () => VECTOR_SLOT_VALUE_TYPE) valueType: VECTOR_SLOT_VALUE_TYPE,
    @Arg('applicableTime') applicableTime: Date
  ) {
    try {
      console.log(collectionName, valueType, applicableTime);

      const vectorSlots = await VectorSlot.createQueryBuilder()
        .delete()
        .where(
          'collectionName = :collectionName and valueType = :valueType and applicableTime = :applicableTime',
          { collectionName, valueType, applicableTime }
        )
        .execute();

      if (vectorSlots.affected === 0) {
        return {
          message: `${vectorSlots.affected} Vector Slots were deleted in ${collectionName}`,
          success: false
        };
      }

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
        // Set the status to 'expired' if applicable.
        if (
          vs.applicableTime !== undefined &&
          vs.applicableEndTime !== undefined &&
          vs.applicableTime > vs.applicableEndTime
        ) {
          vs.status = STATUS.expired;
        }

        vectorSlotMap[vs.vectorSlot] = vs;
      }
    });

    return Object.values(vectorSlotMap).sort((a, b) => Number(a.vectorSlot) - Number(b.vectorSlot));
  }
}
