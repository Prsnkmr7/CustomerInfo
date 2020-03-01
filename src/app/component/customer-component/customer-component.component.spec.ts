import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponentComponent } from './customer-component.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details/customer-details.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

describe('CustomerComponentComponent', () => {
  let component: CustomerComponentComponent, customerDetails: CustomerDetailsService;
  let fixture: ComponentFixture<CustomerComponentComponent>;

  const mockcustomerJson = {
    body: [
      {
        "emp-id": '1',
        "name": "Licensed Frozen Hat",
        "description": "Incidunt et magni est ut.",
        "Age": "50",
        "sex": "Female"
      }
    ]
  };

  const mockCustomerAddress = {
    body: [
      {
        "street": "22 Rue du Grenier",
     "postalCode": "750003",
     "city": "Bangalore",
     "countryCode": "FRA",
     "country": "France",
     "text": "22 Rue du Grenier"
      }

    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComponentComponent ],
      providers:[CustomerDetailsService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponentComponent);
    customerDetails = TestBed.inject(CustomerDetailsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the function getAddressDetails()', () => {
    const customer = {
      "emp-id": '1',
      "name": "Licensed Frozen Hat",
      "description": "Incidunt et magni est ut.",
      "Age": "50",
      "sex": "Female"
    };
    spyOn(customerDetails, 'fetchCustomerDetails').and.returnValue(of([mockCustomerAddress]))
    component.getAddressDetails(customer);
    expect(component.selectedCustomer).toEqual('1');
  });

});
