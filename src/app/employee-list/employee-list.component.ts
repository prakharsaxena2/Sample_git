

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employee = [];
  flag=false;
  myemail: any;
  obj = {
    email: ""
  }

  constructor(private employeeservice: EmployeeService, private router: Router, private tostr: ToastrService) { }
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    email: new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    password: new FormControl('', [Validators.required, this.noWhitespaceValidator])
  });
  ngOnInit() {
    this.employeeservice.getEmployees().subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.employee.push(data[key])
      });
    });


  }
  password;
  get f() {
    return this.registrationForm.controls;
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  onSubmit() {
    this.employeeservice.signup(this.registrationForm.value.email, this.registrationForm.value.password).subscribe(res => {
      this.obj.email = res.success
        res.success ? (this.router.navigate(['/login']),this.flag=true) : alert(res.error)

      if (this.flag) {
        this.tostr.success('Account Created Successfully', 'Signup')
        //this.obj.email = this.registrationForm.value.email
        this.employeeservice.setEmployee(this.obj).subscribe((res) => {

        })


      }

    })

  }

}