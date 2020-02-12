import { Component, OnInit } from '@angular/core';
import { APIService } from "../API.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private apiService: APIService) {

    this.apiService.isLoggedInEmitter.subscribe((mode) => {
      this.isLoggedIn = mode;
    });
  }
  
  ngOnInit() {
    this.isLoggedIn = this.apiService.checkToken();
  }

  logout(){
    this.apiService.destroyToken();
  }
}