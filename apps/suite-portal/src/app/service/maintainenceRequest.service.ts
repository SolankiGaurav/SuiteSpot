import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SUBMIT_MAINTAINENCE_REQUEST } from '../constants/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {

  constructor(private http: HttpClient) { }

  submitMaintainenceRequest(request:MaintenanceRequest): Observable<any> {
    return this.http.post(SUBMIT_MAINTAINENCE_REQUEST,request);
  }

}
