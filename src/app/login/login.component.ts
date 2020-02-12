import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { APIService } from "../API.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  constructor(private apiService: APIService, router: Router) {
  }

  loginCredentials = new FormGroup({
    EmailAddress: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required)
  });

  login() {
    this.apiService.obtainToken(
      this.loginCredentials.value.EmailAddress,
      this.loginCredentials.value.Password,
      'tenantpicker'
    );
  }

  ngOnInit() {

  }
}
