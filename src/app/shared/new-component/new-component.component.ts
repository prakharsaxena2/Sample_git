import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service'
import { AuthenticateService } from '../../../app/authenticate.service';
import {ToastrService} from 'ngx-toastr'
import { EmployeeService } from '../../employee.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit {
  name
  mydata;
  filterData = { category: "" }
  // public products=[];
  public products2;

  // public tvalue = [];
  // public tkey = []




  constructor(private backendservieobject: BackendService,private employeeservice: EmployeeService, private tostr:ToastrService,public authService:AuthenticateService,private router: Router, private router1: ActivatedRoute,) {

    // this.products=this.backendservieobject.getItems();

    this.products2 = this.backendservieobject.full

    // this.tvalue = this.backendservieobject.full2
    // this.tkey = this.backendservieobject.favkeys


    this.backendservieobject.changeData.subscribe(data => {
      this.products2 = data;
    })



  }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn') === 'true')
    {
      this.name=localStorage.getItem('name')
    }
    

  }
  filter(key, val) {

    this.filterData[key] = val;

    this.backendservieobject.setData(this.filterData);
  }

  logout(): void {
    this.tostr.success('Logged Out Successfully','Log Out')
    this.authService.logout();
    this.employeeservice.logout();
    }
   

  // xyz() {
    

  //   var searchTerm = "mayankomar71@gmail.com",
  //     index = -1;
  //   for (var i = 0, len = this.tvalue.length; i < len; i++) {
  //     if (this.tvalue[i].email === searchTerm) {

  //       index = i;
  //       break;
  //     }
  //   }
  //   console.log(this.tkey[index])

  //   this.backendservieobject.setfavdata(this.tkey[index])
  // }

}