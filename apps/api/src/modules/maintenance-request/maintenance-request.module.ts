import { Module } from '@nestjs/common';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestDao } from './maintenance-request.dao';
import { MaintenanceRequestService } from './maintenance-request.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaintainenceRequestSchema,
  MaintenanceRequestModel,
} from '../../models/MaintainenceRequest.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaintenanceRequestModel.name, schema: MaintainenceRequestSchema },
    ]),
  ],
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService, MaintenanceRequestDao, JwtService],
})
export class MaintenanceRequestModule {}
