import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-postad',
  templateUrl: './postad.component.html',
  styleUrls: ['./postad.component.css']
})
export class PostadComponent implements OnInit {
bikes=[];
cars=[];
mobiles=[];
  constructor(private data: EmployeeService,private tostr:ToastrService) { }
  registrationForm = new FormGroup({
    category: new FormControl('', [Validators.required,this.noWhitespaceValidator]),
    owneremail: new FormControl('',[Validators.required,Validators.email,this.noWhitespaceValidator]),
    id: new FormControl('', [Validators.required,this.noWhitespaceValidator]),
    name:new FormControl('', [Validators.required,this.noWhitespaceValidator]),
    ownername:new FormControl('', [Validators.required,this.noWhitespaceValidator]),
    ownerno:new FormControl('',[Validators.required,this.noWhitespaceValidator]),
    price:new FormControl('', [Validators.required,this.noWhitespaceValidator]),
    url:new FormControl('', [Validators.required,this.noWhitespaceValidator]),
  })

  ngOnInit() {
    this.data.getBikes().subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.bikes.push(data[key])
      });
    });
  
    this.data.getCars().subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.cars.push(data[key])
      });
    });
    this.data.getMobiles().subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.mobiles.push(data[key])
      });
    });
  }
  password;
  category;
  get f() {
    console.log('hi')
    return this.registrationForm.controls;
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
    onSubmit() {
    //   if(this.registrationForm.invalid && this.registrationForm.dirty)
  
    this.category=this.registrationForm.value.category
    if (this.category=="bike") {
      this.tostr.success('Ad Posted Successfully','Post Ad')
      this.data.setBikes(this.registrationForm.value).subscribe((res) => {

      })
    }
    else if(this.category=="car") {
      this.tostr.success('Ad Posted Successfully','Post Ad')
      this.data.setCars(this.registrationForm.value).subscribe((res) => {

      })
    }
    else if(this.category=="mobile"){
      this.tostr.success('Ad Posted Successfully','Post Ad')
      this.data.setMobiles(this.registrationForm.value).subscribe((res) => {

      })

    }
    else{
      this.tostr.error('Ad post Failure','Post Ad error')

    }
  }
}
