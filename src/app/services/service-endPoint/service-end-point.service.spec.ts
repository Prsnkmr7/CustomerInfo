import { TestBed, inject } from '@angular/core/testing';
import { ServiceEndPointService } from './service-end-point.service';
import { ApiEndPointService } from '../api-endPoint/api-end-point.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';

describe('ServiceEndPointService', () => {
  let service: ServiceEndPointService;
  let apiService, serviceEndpoint, httpMock: HttpTestingController;;
	const ApiEndpointServiceStub = {
		API_ENDPOINTS: {
      baseURL: '../../assets',
      endpoints: {
        'customeDetails': {
          url: '/DummyData/customerList.json',
          method: 'GET'
        },
        'customerAddress': {
          url: '/DummyData/customerAddress.json',
          method: 'GET'
        }
      }
		}
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: ApiEndPointService, useValue: ApiEndpointServiceStub }],
			imports: [HttpClientTestingModule]
    });
    serviceEndpoint = TestBed.inject(ServiceEndPointService);
    httpMock = TestBed.inject(HttpTestingController);
	});

  it('should be created', () => {
    const service: ServiceEndPointService = TestBed.get(ServiceEndPointService);
    expect(service).toBeTruthy();
  });

  it('should test makeRequest function when the request is successful', () => {
		const mockResponse = [{ hello: 'world' }];
		expect(serviceEndpoint.makeRequest).toBeDefined();
		expect(typeof (serviceEndpoint.makeRequest)).toBe('function');
		serviceEndpoint.makeRequest({ name: 'test' }, 'customeDetails').subscribe((res) => {
			console.log('The http call was successful');
			expect(res).toBeTruthy();
			expect(res.body).toEqual(mockResponse);
		});
		const req = httpMock.expectOne('../../assets/DummyData/customerList.json');
		expect(req.request.method).toEqual('GET');
		const headers = new HttpHeaders();
    req.flush(mockResponse, { headers: headers, status: 200, statusText: 'Successful' });
		expect(serviceEndpoint.makeRequest).toHaveBeenCalled;
	});
});
