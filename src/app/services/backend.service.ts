import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import { Bike } from '../bike'

import { Users } from '../employee';

import { Car } from '../car';
import { Mobile } from '../mobile';
import {ToastrService} from 'ngx-toastr'

var fakeData = [
  {
    id: 5,
    name: 'pulsar 220',
    price: 130000,
    ownername: 'jack',
    catogery: 'bike',
    image: 'assets/productimages/bikes/imgb1.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 6,
    name: 'apache rtr 200',
    price: 100000,
    ownername: 'prakash',
    catogery: 'bike',
    image: 'assets/productimages/bikes/imgb2.jpg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 7,
    name: 'baja avenger',
    price: 130000,
    ownername: 'shubam',
    catogery: 'bike',
    image: 'assets/productimages/bikes/imgb3.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 8,
    name: 'yamaha',
    price: 130000,
    ownername: 'akash',
    catogery: 'bike',
    image: 'assets/productimages/bikes/imgb4.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 1,
    name: 'honda city',
    price: 1200000,
    ownername: 'vivek sharma',
    catogery: 'car',
    image: 'assets/productimages/cars/imgc1.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 2,
    name: 'jeep',
    price: '21L:',
    ownername: 'manas singh',
    catogery: 'car',
    image: 'assets/productimages/cars/imgc2.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 3,
    name: 'toyota fortuner',
    price: 2200000,
    ownername: 'shivang mishra',
    catogery: 'car',
    image: 'assets/productimages/cars/imgc3.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 4,
    name: 'honda crv',
    price: 2800000,
    ownername: 'parth agarwal',
    catogery: 'car',
    image: 'assets/productimages/cars/imgc4.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 22,
    name: 'samsung',
    price: '21L:',
    ownername: 'manas singh',
    catogery: 'mobile',
    image: 'assets/productimages/phones/imgp3.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 33,
    name: 'apple',
    price: 2200000,
    ownername: 'shivang mishra',
    catogery: 'mobile',
    image: 'assets/productimages/phones/imgp1.jpeg',
    image1: 'assets/images/img11.jpg'
  },
  {
    id: 11,
    name: 'mi',
    price: 2800000,
    ownername: 'parth agarwal',
    catogery: 'mobile',
    image: 'assets/productimages/phones/imgp4.jpeg',
    image1: 'assets/images/img11.jpg'
  },

];

@Injectable({
  providedIn: 'root'
})


export class BackendService {



  public full = [];
  public full2 = [];
  public favlist = []
  public favkeylist = []

  public fcount

  public fkeys=[]

  public tvalue = [];
  public tkey = []

  public fuserid;

  public femail;


  public data: any
  public data2: any
  public changeData: Subject<any> = new Subject<any>();

  public favdata: any[]
  public favkeys = []
  public ioa;
  public flag:boolean;

  public username
  public favlist2=[];

  





  private url2: string = 'https://angularfirebase-62dab.firebaseio.com/category/Bike.json';
  private url3: string = 'https://angularfirebase-62dab.firebaseio.com/category/car.json';
  private url4: string = 'https://angularfirebase-62dab.firebaseio.com/category/mobile.json';

  private urlf: string = 'https://angularfirebase-62dab.firebaseio.com/Users.json';


  x = 10;

  constructor(private http: HttpClient,private tostr:ToastrService) {




    console.log(localStorage.getItem('token'))
 


    this.flag=true;

    // var promise1 = new Promise((resolve, reject) => {
      
    
    //   if(localStorage.getItem('isLoggedIn')){
    //     resolve();}
    
    // });

    // promise1.then(
    //   ()=>{console.log('hihih')}
    // )
  






    this.http.get<Users[]>(this.url2).subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.full.push(data[key])
      });
    });
    this.http.get<Users[]>(this.url3).subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.full.push(data[key])
      });
    });

    this.http.get<Users[]>(this.url4).subscribe((data) => {
      Object.keys(data).forEach((key) => {
        this.full.push(data[key])

      });
    });



    this.http.get<Users[]>(this.urlf).subscribe((data) => {

      Object.keys(data).forEach((key) => {
        this.full2.push(data[key])
        this.favkeys.push(key)
      });
    });


   this.data = this.full;














  }

 lsd(){

  var useremail=localStorage.getItem('token')

  this.data = this.full;

  this.tkey=this.favkeys
   this.tvalue=this.full2
 
   console.log(this.tkey);
 
   console.log(this.tvalue);
 
   
    
    

       var searchTerm = useremail,index = -1;
 
            console.log(searchTerm);
      
 
        for (var i=0;i< this.tvalue.length;i++) {
               
               if (this.tvalue[i].email === searchTerm) {
                 console.log(i)
                   index = i;
                 break;
               }
            }
            this.fuserid = this.tkey[index]
 
            console.log(this.fuserid)

            return this.fuserid


 }


  getItems() {
    return this.data;
  }
  getfavtotal() {

   
 

  }
  
  setData(filterData) {

    this.data2 = this.full;


    this.data2 = this.data2.filter((data) => {

      if (data.category == filterData.category) { return true; }
      return false;

    });



    this.changeData.next(this.data2);



  }


  setfavdata(id) {
  
  var fid=this.lsd()


   

    var urlt = 'https://angularfirebase-62dab.firebaseio.com/Users/' + fid + '/favourate.json';
    
    this.http.post(urlt,{pid:id}).subscribe()

    this.tostr.success('Item Added to favoirate','Favoirate')
      
  }



  delfavdata(pid){
    var fid=this.lsd()
    
    var urlt = 'https://angularfirebase-62dab.firebaseio.com/Users/' + fid + '/favourate/'+pid+'/pid.json';
    
    this.http.delete(urlt).subscribe()


  }




  






getfavdata2(){
  var fid=this.lsd()

  var urlt = 'https://angularfirebase-62dab.firebaseio.com/Users/' + fid + '/favourate.json';

  return this.http.get<Users[]>(urlt)
}

} 


