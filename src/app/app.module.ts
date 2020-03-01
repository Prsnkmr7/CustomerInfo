import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceEndPointService } from './services/service-endPoint/service-end-point.service';
import { CustomerDetailsService } from './services/customer-details/customer-details.service';
import { ApiEndPointService } from './services/api-endPoint/api-end-point.service';
import { CustomerComponentComponent } from './component/customer-component/customer-component.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ServiceEndPointService, CustomerDetailsService, ApiEndPointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
