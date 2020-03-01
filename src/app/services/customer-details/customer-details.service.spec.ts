import { TestBed, fakeAsync } from '@angular/core/testing';

import { CustomerDetailsService } from './customer-details.service';
import { ServiceEndPointService } from '../service-endPoint/service-end-point.service';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomerDetailsService', () => {
  let service: CustomerDetailsService, spyMakeRequest, serviceEnd: ServiceEndPointService;
  const ServiceEndpointsServiceStub = {
		makeRequest: function () {
			return payload;
		}
	};

  const payload = [
      {
        "emp-id": 1,
        "name": "LicensedFrozenHat",
        "description": "Inciduntetmagniestut.",
        "Age": "50",
        "sex": "Female"
      }
    ];
  const addresspayload = [
    {
      "street": "22 Rue du Grenier",
     "postalCode": "750003",
     "city": "Bangalore",
     "countryCode": "FRA",
     "country": "France",
     "text": "22 Rue du Grenier"
    }
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
			providers: [CustomerDetailsService,
				{ provide: ServiceEndPointService, useValue: ServiceEndpointsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    serviceEnd = TestBed.inject(ServiceEndPointService);
    service = TestBed.inject(CustomerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should test fetchCustomerDetails function', fakeAsync(() => {
    spyMakeRequest = spyOn(serviceEnd, 'makeRequest').and.returnValue(
      Observable.of(addresspayload)
    );
			expect(service.fetchCustomerAddress).toBeDefined();
			const fetchCustCheck = function () {
				service.fetchCustomerAddress({}).subscribe((res: any) => {
          expect(res).toBeTruthy();
        });
			};
			fetchCustCheck();
			expect(spyMakeRequest).toHaveBeenCalled();
			expect(spyMakeRequest.calls.any()).toEqual(true);
    }));
  it('should test fetchCustomerAddress function', fakeAsync(() => {
      spyMakeRequest = spyOn(serviceEnd, 'makeRequest').and.returnValue(
        Observable.of(payload)
      );
        expect(service.fetchCustomerDetails).toBeDefined();
        const fetchCustCheck = function () {
          service.fetchCustomerDetails({}).subscribe((res) => {
            expect(res).toBeTruthy();
          });
        };
        fetchCustCheck();
        expect(spyMakeRequest).toHaveBeenCalled();
        expect(spyMakeRequest.calls.any()).toEqual(true);
      }));
});
