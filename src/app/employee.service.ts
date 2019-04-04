
import { Injectable } from '@angular/core';
import {Bike} from './bike'
import { HttpClient } from '@angular/common/http';
import { Users } from './employee';
import { Observable, Subject } from 'rxjs';
import {Car} from './car';
import {Mobile} from './mobile';
import { AngularFireDatabase } from '@angular/fire/database';
// import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'





@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  user: Observable<firebase.User>;
  private _url: string = 'https://angularfirebase-62dab.firebaseio.com/Users.json';
  private url2:string='https://angularfirebase-62dab.firebaseio.com/category/Bike.json';
  private url3:string='https://angularfirebase-62dab.firebaseio.com/category/car.json';
  private url4:string='https://angularfirebase-62dab.firebaseio.com/category/mobile.json';
  private url5:string='https://angularfirebase-62dab.firebaseio.com/wishlist.json';

  private loginResponse = new Subject();
  private signupResponse= new Subject();


  currentMessage = new BehaviorSubject(null);
  constructor(private http: HttpClient, private angularFireDB: AngularFireDatabase,private route:Router,
    private angularFireAuth: AngularFireAuth, private angularFireMessaging: AngularFireMessaging,private tostr:ToastrService) {
      this.user = angularFireAuth.authState;
      this.angularFireMessaging.messaging.subscribe(
        (_messaging) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      )
    }
    /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
  getDetails(id,data)
  {
    let res=null;
    data.forEach(element=>
      {
        if(element.id===id)
        {
          res=element;
        }
      })
      return res;

  }
  getfavDetails(email,data)
  {
    let res=null;
    data.forEach(element=>
      {
        if(element.email===email)
        {
          res=element;
        }
      })
      return res;

  }
  signup(email: string, password: string):Observable<any>{
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.signupResponse.next({success : value.user.email})
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.signupResponse.next({error : err.message})
      });
     
      return this.signupResponse.asObservable();
  }
  login(email: string, password: string) : Observable<any> {
    let data;
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        console.log(value.user.email)
        this.loginResponse.next({success : value.user.email});
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.loginResponse.next({error : err.message});
      });
      return this.loginResponse.asObservable();
  }
  getEmployees(): Observable<Users[]> {

    return this.http.get<Users[]>(this._url);
  }
  
  getBikes(): Observable<Bike[]> {

    return this.http.get<Bike[]>(this.url2);
  }
  getCars(): Observable<Car[]> {

    return this.http.get<Car[]>(this.url3);
  }
  getMobiles(): Observable<Car[]> {

    return this.http.get<Mobile[]>(this.url4);
  }
  // getFav(): Observable<Wishlist[]> {

  //   return this.http.get<Wishlist[]>(this.url5);
  // }
  setEmployee(empdata): Observable<Users[]> {
    console.log(empdata);
    return this.http.post<Users[]>(this._url, empdata);
  }
  setBikes(bikedata): Observable<Bike[]> {
    console.log(bikedata);
    return this.http.post<Bike[]>(this.url2, bikedata);
  }
  setCars(cardata): Observable<Bike[]> {
    console.log(cardata);
    return this.http.post<Bike[]>(this.url3,cardata);
  }
  setMobiles(mobiledata): Observable<Bike[]> {
    console.log(mobiledata);
    return this.http.post<Bike[]>(this.url4,mobiledata);
  }
  
  // addItem(fav): Observable<Wishlist[]> {
  //   console.log(fav);
  //   return this.http.post<Wishlist[]>(this.url5,fav);
  // }
  logout() {
    this.angularFireAuth
      .auth
      .signOut();
      this.route.navigate(['/login']);

  }
}