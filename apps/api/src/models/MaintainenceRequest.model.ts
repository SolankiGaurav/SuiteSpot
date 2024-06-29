import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { table } from 'console';

export type MaintenanceRequestDocument = HydratedDocument<
  MaintenanceRequestModel
>;

@Schema({collection:'MaintaineceRequest'})
export class MaintenanceRequestModel {
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  email: string;

  @Prop({required:true})
  unitNumber: string;

  @Prop({ type: String, enum: ALL_SERVICE_TYPES })
  serviceType: string;

  @Prop({required:true})
  summary: string;

  @Prop()
  details?: string;

  @Prop({default:false})
  isClosed?:Boolean
}

export const MaintainenceRequestSchema = SchemaFactory.createForClass(MaintenanceRequestModel);
