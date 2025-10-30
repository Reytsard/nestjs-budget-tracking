import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionType = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    @Prop()
  id: number;

  @Prop()
  uid: string;

  @Prop()
  category: number;

  @Prop()
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);