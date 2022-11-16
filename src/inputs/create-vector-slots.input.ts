import { Field, InputType } from 'type-graphql';
import { CreateVectorSlotInput } from './create-vector-slot.input';

@InputType()
export class createVectorSlotsInput {
  @Field(() => [CreateVectorSlotInput])
  public vectorSlots!: CreateVectorSlotInput[];
}
