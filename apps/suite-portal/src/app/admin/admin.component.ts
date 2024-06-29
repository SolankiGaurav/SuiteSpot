import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES, IStatistics, MaintenanceRequest } from '@suiteportal/api-interfaces';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  serviceTypes = ALL_SERVICE_TYPES;
  displayedColumns: string[] = ['name', 'email', 'unitNumber', 'serviceType','summary','action'];
  displayedColumnsClosed: string[] = ['name', 'email', 'unitNumber', 'serviceType','summary'];
  statistics:IStatistics[] = [];
  openRequests:MaintenanceRequest[]=[];
  closeRequests:MaintenanceRequest[]=[];


  constructor(private adminService:AdminService) {}

  ngOnInit(): void {
    this.getAllMaintainenceRequests();
    this.getRequestsStats();

  }

  onActionClick(element:MaintenanceRequest){
    this.adminService.closeMaintaineceRequest(element['_id']).subscribe((data)=>{
      this.getRequestsStats();
      this.openRequests = this.openRequests.filter(req=>req['_id']!==data['_id']);
      this.closeRequests = [...this.closeRequests,data];
    },(err)=>{
      console.log("Error occured")
    })
  }

  getAllMaintainenceRequests(){
    this.adminService.getAllRequests().subscribe((data:MaintenanceRequest[])=>{
      this.openRequests = data.filter(req=>!req.isClosed);
      this.closeRequests = data.filter(req=>req.isClosed);
    },(err)=>{
      console.log("error occured");
    });
  }

  getRequestsStats(){
    this.adminService.getRequestsStats().subscribe((data:IStatistics[])=>{
      this.statistics = data;
    },(err)=>{
      console.log("Error occured");
    })
  }

}
