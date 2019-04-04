import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Users} from '../employee';

@Injectable({
  providedIn: 'root'
})
export class FavouratesService {
  public full;

  private url2:string='https://angularfirebase-62dab.firebaseio.com/Users.json';


  constructor(private http:HttpClient) {


   }
}
