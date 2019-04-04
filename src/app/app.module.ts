import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { EmployeeService } from './employee.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';
import {AuthenticateService} from './authenticate.service';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NewComponentComponent } from './shared/new-component/new-component.component'
import { ProductdetailsComponent } from '../app/shared/productdetails/productdetails.component'
import{FavourateComponent} from '../app/shared/favourate/favourate.component'
import{FavouratesService} from '../../src/app/services/favourates.service'
import{PostadComponent} from '../app/shared/postad/postad.component'
import  {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SigninComponent,
    ProductDetailsComponent,
    FavourateComponent,
    ProductdetailsComponent,
    NewComponentComponent,
    PostadComponent,
 
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
    


  ],
  providers: [EmployeeService,AuthenticateService,AuthGuard,FavouratesService,AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
