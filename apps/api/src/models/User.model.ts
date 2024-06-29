import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ALL_USER_TYPES } from '@suiteportal/api-interfaces'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
  @Prop({unique:true,required:true})
  username: string;

  @Prop({type:String,enum:ALL_USER_TYPES,default:'admin'})
  role: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
