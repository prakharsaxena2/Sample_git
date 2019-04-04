import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public employee = [];

  constructor(private employeeservice: EmployeeService,private router: Router,private tostr:ToastrService) 
  
  {
 
  }
  name:string;
  email:any;
  flag=false;
  

  onSubmit(loginform: NgForm) {
  
    this.employeeservice.login(loginform.value.email, loginform.value.password).subscribe(res=>{
      res.success ? (this.router.navigate(['/body']),this.flag=true) : alert(res.error)

    
      if(this.flag){
        
       
        this.email=loginform.value.email;
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', res.success);
        this.flag=false

      }

    })
  }


  ngOnInit() {
    console.log(localStorage.getItem('isLoggedIn'))
    localStorage.getItem('isLoggedIn') === 'true' && this.router.navigate(['/body'])

 

  }

}
