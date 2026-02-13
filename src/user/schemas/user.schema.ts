// We can also create schemas the way we used to do in express, but here we'll try creating it in 'nestjs' style

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  fname: string;

  @Prop({required: true})
  lname: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({default: Role.Student})
  role: string;  
}

export const UserSchema = SchemaFactory.createForClass(User);
