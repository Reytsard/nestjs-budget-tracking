import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types, } from "mongoose";
import { Category } from "./category.schema";

export type UserType = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  uuid: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  role: Types.ObjectId;
}


export const UserSchema = SchemaFactory.createForClass(User);
