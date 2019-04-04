import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor( private data: EmployeeService,public route: ActivatedRoute, private router: Router) { }
bikes=[];
productname:string;
  ngOnInit() {
    this.data.getBikes().subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.bikes.push(data[key])
      });
    });
    this.productname= this.route.snapshot.paramMap.get('url');
 
  }

}
