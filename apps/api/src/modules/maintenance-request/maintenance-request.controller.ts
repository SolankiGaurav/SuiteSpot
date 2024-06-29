import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {}

  @Post('/')
  createMaintenanceRequest(@Body() maintenanceRequest: MaintenanceRequest) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return this.maintenanceRequestService.createMaintenanceRequest(
      maintenanceRequest
    );
  }

  @Get('/stats')
  @UseGuards(AuthGuard)
  getRequestsStats() {
    return this.maintenanceRequestService.getStatsFromRequest();
  }

  @Get('/:id')
  getMaintenanceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put('/:id/close')
  closeMaintaineceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Please provide id');
    }
    return this.maintenanceRequestService.closeMaintaineceRequestById(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllMaintaineceRequests() {
    return this.maintenanceRequestService.getAllMaintaienceRequests();
  }


}
