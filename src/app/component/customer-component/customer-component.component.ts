import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details/customer-details.service';

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.scss']
})
export class CustomerComponentComponent implements OnInit {

  // Variable declared
  public fullcustomerDetails: Array<object>;
  public addressDetails: Array<object> = [];
  public selectedCustomer: string;

  constructor(public customerData: CustomerDetailsService ) { }

  // This is to handle customerDetail response incase some modification is required
  public handleCustomerDetailResponse(res: any) {
    let custorDetails = res.body;
    this.fullcustomerDetails = JSON.parse(JSON.stringify(custorDetails));
  }

  // This is to handle customerAddressDetail response incase some modification is required
  public handleCustomerAddressResponse(res: any) {
    let custorAddress = res.body;
    this.addressDetails = JSON.parse(JSON.stringify(custorAddress));
  }

  ngOnInit(): void {
    let payload: object = {}; // Incase the payload is needed to be passed
    this.customerData.fetchCustomerDetails(payload).subscribe(this.handleCustomerDetailResponse.bind(this));
  }

  getAddressDetails(customer: object) {
    this.selectedCustomer = customer['emp-id'];
    this.customerData.fetchCustomerAddress({id: customer['emp-id']}).subscribe(this.handleCustomerAddressResponse.bind(this));
  }

}
