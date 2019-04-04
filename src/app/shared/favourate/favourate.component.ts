import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'favourate',
  templateUrl: './favourate.component.html',
  styleUrls: ['./favourate.component.css']
})
export class FavourateComponent implements OnInit {
  private favlist=[];
  private fkeys=[];
  public products2 = [];
  public products3
  private b;

  public tvalue = [];
  public tkey = []

  public flag=true



  constructor(private backendservieobject: BackendService,private tostr:ToastrService) {
    this.products3 = backendservieobject.full;


  }

  ngOnInit() {


setTimeout(
  ()=>{
    this.backendservieobject.getfavdata2().subscribe(
      (data) => {
        Object.keys(data).forEach((key) => {
          

          this.favlist.push(data[key].pid)
          this.fkeys.push(key)
           
        });
      }

    )
  },500
)

    

 

}


deltofav(id){

 
  for( var i = 0; i < this.products2.length; i++){ 
    if ( this.products2[i].id == id) {
      this.products2.splice(i, 1); 
    }
 }
 this.tostr.success('Item Deleted from favoirate','Favoirate')





 var keyindex=this.favlist.indexOf(id);

 this.backendservieobject.delfavdata(this.fkeys[keyindex]); 
}

showfavourate(){

  if(this.flag){
  var x = [];
    
  

    this.favlist.map(

      (item) => {

        console.log(item)

        x = this.products3.filter(

          (data) => {


            if (data.id == item) {

              return true;
            }
            return false;

          })
          console.log(x)
        this.products2.push(x[0])


      })

      this.flag=false;
    }
      

  
}


}

