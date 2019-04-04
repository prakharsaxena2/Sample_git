import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService} from 'ngx-toastr'
import { looseIdentical } from '@angular/core/src/util';







@Component({
  selector: 'productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']


})
export class ProductdetailsComponent implements OnInit {

  url;
  urllist;
  urlid;
  item;
  id
  ownername;
  owneremail;
  ownerphone;
  public products = [];
  public iconflag;
  public sampleflag = false;

  public favlist = []

  constructor(private tostr:ToastrService,private backendserviceobject: BackendService, private route: Router, private router1: ActivatedRoute) {
    this.id = this.router1.snapshot.paramMap.get('id')

    this.products = this.backendserviceobject.full;
    this.url = window.location.href;
    this.urllist = this.url.split('details/');
    this.urlid = this.urllist[1];

    this.products = this.products.filter((data) => {
      if (data.id == this.urlid) {
        return true;
      }
      return false;
    });


  }

  ngOnInit() {

    var fkeys=[];


        this.backendserviceobject.getfavdata2().subscribe(
          (data) => {
            Object.keys(data).forEach((key) => {
            this.favlist.push(data[key].pid)
            fkeys.push(key) 
            });
          })

              setTimeout(
                ()=>{
             

                  this.favlist.filter(
                 
            
                    (data)=>{ 
                     if(data==this.urlid)
                   {
                   
                   
                     this.iconflag=true;

                    

                   }
                   }
                  )
               
                },500
              )
            
  }
  getowner() {
    this.ownername = 'NAME: ' + this.products[0].ownername + '';
    this.owneremail = 'EMAIL: ' + this.products[0].owneremail + '';
    this.ownerphone = 'PHONE.NO: ' + this.products[0].ownerno;



  }


 
addtofav(id){
 this.iconflag=true
  console.log(document.getElementById('favbutton1'))

  this.backendserviceobject.setfavdata(id)
}


}
