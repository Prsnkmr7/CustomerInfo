import { Injectable } from '@angular/core';
import { ApiEndPointService } from '../api-endPoint/api-end-point.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceEndPointService {
  private baseUrl: String = this.apiEndpoint.API_ENDPOINTS.baseURL;
  private endPoints = this.apiEndpoint.API_ENDPOINTS.endpoints;

  constructor(private apiEndpoint: ApiEndPointService, private http: HttpClient) {
  }

  getRequestOptions(endpointName: string, body: Object) {
    const endpointDetails = this.endPoints[endpointName];
    const headers = new HttpHeaders();
    return {
      url: this.baseUrl + endpointDetails.url,
      method: endpointDetails.method,
      body: body,
      headers: headers
    };

  }

  private processData(res: Response) {
    const body = res;
    return body || [];
  }

  makeRequest(model: Object, endpointName: string): Observable<object[]> {

    const options = this.getRequestOptions(endpointName, model);

    return this.http.request(options.method, options.url,
      { body: options.body, headers: options.headers, observe: 'response' })
      .pipe(map(this.processData.bind(this)));
  }
}
