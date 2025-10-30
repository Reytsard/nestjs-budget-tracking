import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionType = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop()
  id: number;

  @Prop()
  uid: string;

  @Prop()
  category: string;

  @Prop()
  amount: number;

  @Prop({ default: new Date() })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);