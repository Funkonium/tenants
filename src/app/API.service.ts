import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';    
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { ErrorService } from "./error.service";

@Injectable()
export class APIService {
  
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedInEmitter: Observable<boolean> = this.isLoggedIn.asObservable();

  private apiDomain = 'https://apidev.hakka.eu';

  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) {

  }

  obtainToken(username, password, routerTarget) {
    this.errorService.clearErrorMessage();

    const clientSecret = '8d4hqi49kzk04c400oc04s0kk8owo0wgws8o40wwcsgw4cssw';
    const clientID = '38158571-1da9-11ea-b12a-525400eeb47f_3ch0ns9nb2wwsgg8gskw88sos080k04ckko4sg4sssk4g08o0w';

    let authURL = this.apiDomain +  '/oauth/v2/token';   
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientID + ":" + clientSecret)
      })
    };

    let params = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    this.http.post(authURL, params.toString(), httpOptions)
      .subscribe(
        reponseData => this.saveToken(reponseData, routerTarget),
        error => this.errorService.errorHandler(error,'obtainToken')
        );
  }

  saveToken(data, routerTarget) {
    
    sessionStorage.setItem('userTokenObject', JSON.stringify(data));

    if (this.checkToken){
      this.isLoggedIn.next(true); 
      this.router.navigate([routerTarget]) 
    }      
  }

  destroyToken(){
    this.errorService.clearErrorMessage();
    sessionStorage.removeItem('userTokenObject');
    this.router.navigate(['/']);    
    this.isLoggedIn.next(false);  
    this.errorService.errorMessage.next("You have been logged out")  
  }

  checkToken(){
    let returnVal = false;

    if (this.retrieveToken().length > 0){
      returnVal = true;     
    }
    return returnVal;
  }

  retrieveToken() {

    let accessToken = '';
    let accessTokenObject = JSON.parse(sessionStorage.getItem('userTokenObject'));

    if (accessTokenObject !== null) {
          
      accessToken = (accessTokenObject.access_token !== undefined) ? accessTokenObject.access_token : '';
    }

    return accessToken;
  }

  getTenants(){
    this.errorService.clearErrorMessage();

    let URL = this.apiDomain + '/api/v1/me/tenants';   
    let httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': 'Bearer ' + this.retrieveToken()
      })
    };
  
    return this.http.get(URL, httpOptions);

  }

  getWalletBalance(tenantID){
    this.errorService.clearErrorMessage();

    let URL = this.apiDomain + '/api/v1/me/wallet';  

    let httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': 'Bearer ' + this.retrieveToken(),
        'X-tenant-id': tenantID
      })
    };

    return this.http.get(URL, httpOptions)

  }





}
