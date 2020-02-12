import { Component, OnInit } from '@angular/core';
import { APIService } from "../API.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private APIService: APIService) {

    this.APIService.isLoggedInEmitter.subscribe((mode) => {
      this.isLoggedIn = mode;
    });
  }
  
  ngOnInit() {
    this.isLoggedIn = this.APIService.checkToken();
  }

  logout(){
    this.APIService.destroyToken();
  }
}