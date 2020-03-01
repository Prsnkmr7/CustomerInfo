import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiEndPointService {

  constructor() { }
    public API_ENDPOINTS = {
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
    };
}
