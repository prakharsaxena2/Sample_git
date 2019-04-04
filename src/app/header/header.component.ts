import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';
import { BackendService} from '../services/backend.service'
import {ToastrService} from 'ngx-toastr'
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public tvalue;
  public tkey;
  public username;
  favcount=10;




  constructor(public authService:AuthenticateService,private router: Router,private employeeservice: EmployeeService,private dbobj:BackendService,private tostr:ToastrService) { 
    this.tvalue=dbobj.full2
    this.tkey=dbobj.favkeys;
  
 
  }

  ngOnInit() {

    


   

  
  

  }
 
  logout(): void {
    this.tostr.success('Logged Out Successfully','Log Out')
    this.authService.logout();
    this.employeeservice.logout();
    }
  favnavfunc(){
    

    this.router.navigate(['/favourate'])

  }
  postadd(){
    this.router.navigate(['/postad']);
  }
}
