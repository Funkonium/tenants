import { Component, OnInit } from '@angular/core';
import { ErrorService } from "../error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage: String = "";

  constructor(private ErrorService: ErrorService) { 

    this.ErrorService.errorMessageEmitter.subscribe((message) => {
        this.errorMessage = message;
    });
  }

  ngOnInit() {
  }

}
