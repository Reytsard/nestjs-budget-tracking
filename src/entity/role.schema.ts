import { Injectable } from '@nestjs/common';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleType = HydratedDocument<Role>;

@Injectable()
export class Role {
  @Prop()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
