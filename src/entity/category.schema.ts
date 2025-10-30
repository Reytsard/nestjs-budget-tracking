import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryType = HydratedDocument<Category>;

@Schema()
export class Category {

  @Prop()
  id: number;

  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);