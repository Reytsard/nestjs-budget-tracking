import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "./category.schema";

export type UserType = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  uuid: string;

  @Prop({required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Category'})
  role: Category;
}


export const UserSchema = SchemaFactory.createForClass(User);
