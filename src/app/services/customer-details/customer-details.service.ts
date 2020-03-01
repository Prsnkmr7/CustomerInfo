import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ServiceEndPointService } from '../service-endPoint/service-end-point.service';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  constructor(public serviceEndpoint: ServiceEndPointService) { }
  fetchCustomerDetails(payload: object): Observable<object[]> {
    return this.serviceEndpoint.makeRequest(payload, 'customeDetails').pipe(map(res => res));
  }

  fetchCustomerAddress(payload: object): Observable<object[]> {
    return this.serviceEndpoint.makeRequest(payload, 'customerAddress').pipe(map(res => res));
  }
}
