import { Component, OnInit } from "@angular/core";
import { APIService } from "../API.service";
import { Tenant } from "./tenant";
import { ErrorService } from "../error.service";

@Component({
  selector: "app-tenant-picker",
  templateUrl: "./tenant-picker.component.html",
  styleUrls: ["./tenant-picker.component.css"]
})
export class TenantPickerComponent implements OnInit {
  tenants = [];
  wallet;

  constructor(private apiService: APIService, private errorService: ErrorService) {}

  ngOnInit() {
    this.errorService.clearErrorMessage();
    this.apiService
      .getTenants()
      .subscribe(
        responseData => this.handleTenants(responseData),       
        err => {
          if(this.errorService.errorHandler(err,'TenantPicker_init')){
            this.apiService.destroyToken();
          }
        }
      );  
  }

  handleTenants(responseData) {
    if (responseData["hydra:member"] !== undefined) {
      responseData["hydra:member"].forEach(tenant => {
        if (tenant.id !== undefined && tenant.name !== undefined) {
          this.tenants.push(new Tenant(tenant.id, tenant.name));
        }
      });
    }

    if (this.tenants.length === 0){
      this.errorService.errorMessage.next('No tenants available');
    }
  }

  refreshWallet(tenantId) {
    this.errorService.clearErrorMessage();    
    this.wallet = "";

    if (tenantId !== "0") {
      this.apiService
        .getWalletBalance(tenantId)
        .subscribe(
          responseData => this.handleWallet(responseData),
          err =>{
            if(this.errorService.errorHandler(err,'refreshWallet')){
              this.apiService.destroyToken();
            }
          }
        );
    }
  }

  handleWallet(responseData) {


    if (responseData.credits !== undefined){
      this.wallet = responseData;
    }
    else{
      this.errorService.errorMessage.next('Unable to display wallet balance');
    }
  }
}
