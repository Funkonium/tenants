import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TenantPickerComponent } from './tenant-picker/tenant-picker.component';
import { APIService } from './API.service';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent},
      { path: 'tenantpicker', component: TenantPickerComponent}
    ])    
  ],
  declarations: [ AppComponent, LoginComponent, TenantPickerComponent, NavigationComponent, ErrorComponent ],
  bootstrap:    [ AppComponent ],
  providers: [APIService]
})
export class AppModule { }
