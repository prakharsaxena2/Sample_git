import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { SigninComponent } from './signin/signin.component';
import {AuthGuard} from './auth.guard'
import { ProductDetailsComponent } from './product-details/product-details.component';

import { NewComponentComponent } from './shared/new-component/new-component.component'
import { ProductdetailsComponent } from '../app/shared/productdetails/productdetails.component'
import{FavourateComponent} from '../app/shared/favourate/favourate.component'

 import{PostadComponent} from '../app/shared/postad/postad.component'



const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'Signup',component:EmployeeListComponent},
  {path:'Signin/:name',component:SigninComponent,canActivate: [AuthGuard] },
  {path:'Success',component:SigninComponent},
 
  // {path:'details/:url',component:ProductDetailsComponent,canActivate: [AuthGuard]},



  {path:'body',component:NewComponentComponent,canActivate: [AuthGuard]},
  {path:'details/:id',component:ProductdetailsComponent,canActivate: [AuthGuard]},
  {path:'favourate',component:FavourateComponent,canActivate: [AuthGuard]},
  {path:'postad',component:PostadComponent,canActivate: [AuthGuard]},

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
