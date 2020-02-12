import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { APIService } from "./API.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public errorMessageEmitter: Observable<string> = this.errorMessage.asObservable();  

  constructor() { }

  clearErrorMessage(){
    this.errorMessage.next("");
  }

  errorHandler(error, originator){

    let errorText = "";
    let killSession: Boolean = false;

    console.log(originator);
    console.log("Status:" + error.status)
    console.log("Status text:" + error.statusText)
    console.log("ok:" + error.ok)
    console.log("Message:" + error.message)
    console.log("Error:" + error.error.error)
    console.log("Error:" + error.error.error_description)

    if (error.status === 401){
      killSession = true;
    }    

    switch (originator){
      case "TenantPicker_init":
        errorText = "Unable to load tenants";  
        break;
      case "obtainToken":
        errorText = "Unable to login";   

        if ((error.status === 400) && (error.error.error === "invalid_grant")){
          errorText = "Invalid username or password";
        }
        
        break;
      case "refreshWallet":
        errorText = "Unable to update wallet";

        break;
      default:
        errorText = "An error has occurred";
    }

    this.errorMessage.next(errorText)    
    return killSession;
  }  
}
