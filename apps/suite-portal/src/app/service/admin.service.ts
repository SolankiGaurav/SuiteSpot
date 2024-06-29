import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GET_ALL_REQUESTS, GET_STATS, LOGIN_USER, SUBMIT_MAINTAINENCE_REQUEST } from '../constants/urlConstants';
import IToken from '../interfaces/ITokenData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getAllRequests():Observable<MaintenanceRequest[]>{
    return this.http.get<MaintenanceRequest[]>(GET_ALL_REQUESTS);
  }

  closeMaintaineceRequest(id:string):Observable<MaintenanceRequest>{
    return this.http.put<MaintenanceRequest>(`/maintenance-requests/${id}/close`,{});
  }

  getRequestsStats(){
    return this.http.get(GET_STATS);
  }

}
