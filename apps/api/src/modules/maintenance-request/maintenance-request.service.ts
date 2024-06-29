import { Injectable } from '@nestjs/common';
import { IStatistics, MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDB } from './maintenance-request.dao';
import { InjectModel } from '@nestjs/mongoose';
import {
  MaintenanceRequestDocument,
  MaintenanceRequestModel,
} from '../../models/MaintainenceRequest.model';
import { Model } from 'mongoose';

@Injectable()
export class MaintenanceRequestService {
  constructor(
    @InjectModel(MaintenanceRequestModel.name)
    private maintainenceRequestModel: Model<MaintenanceRequestModel>
  ) {}

  async getAllMaintaienceRequests(): Promise<MaintenanceRequestDocument[]> {
    return await this.maintainenceRequestModel.find();
  }

  async createMaintenanceRequest(
    maintenanceRequest: MaintenanceRequest
  ): Promise<MaintenanceRequestDocument> {
    return await this.maintainenceRequestModel.create(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDocument> {
    return await this.maintainenceRequestModel.findById(id);
  }

  async closeMaintaineceRequestById(
    id: string
  ): Promise<MaintenanceRequestDocument> {
    const result = await this.maintainenceRequestModel.findByIdAndUpdate(
      id,
      {
        isClosed: true,
      },
      { new: true }
    );
    return result;
  }

  async getStatsFromRequest(): Promise<IStatistics[]> {
    return await this.maintainenceRequestModel
      .aggregate([
        {
          $group: {
            _id: '$serviceType',
            closedCount: {
              $sum: { $cond: [{ $eq: ['$isClosed', true] }, 1, 0] },
            },
            openCount: {
              $sum: { $cond: [{ $eq: ['$isClosed', false] }, 1, 0] },
            },
          },
        },
        {
          $project:{
            serviceType : "$_id",
            closedCount:1,
            openCount:1
          }
        }
      ])
      .exec();
  }
}
