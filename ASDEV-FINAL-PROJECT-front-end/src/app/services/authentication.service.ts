import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token:string | undefined;
  isAuthenticated: Boolean = false;
  removelogin:Boolean= true;
  username:string | undefined;
  status:string | undefined;

  constructor(
    private storage:StorageService,
    private router: Router,
  ) { }

  storedata(username: any, token:any, status: any, isauthenticated:Boolean){
    this.isAuthenticated=isauthenticated;
    this.removelogin=false;
    this.username=username;
    this.token=token;
    this.status=status;
    this.storage.setItem('token',token);
    this.storage.setItem('username',username);
    this.storage.setItem('status',status);
    this.storage.setItem('isAuthenticated',isauthenticated);

    this.isAuthenticatedAsAdmin();

  }
  public signout() {
    this.storedata(null, null, null, false);
    this.removelogin=true;
    this.isAuthenticatedAsAdmin();
    this.getIsAuthenticated();
    this.router.navigate(["login"]);
  }

  isLoggedIn(): Boolean {
    return !!this.getToken();
  }

  getToken() {
    return this.storage.getItem('token');
  }
  getUser() {
    return this.storage.getItem('username');
  }
  getStatus() {
    return this.storage.getItem('status');
  }
  getIsAuthenticated():Boolean{
    this.getIsNotAuthenticated();
    if(this.storage.getItem('isAuthenticated')=="true"){
      return true;
    }else{
      return false;
    }
  }
  getIsNotAuthenticated():Boolean{
    //console.log(this.storage.getItem('isAuthenticated'));
    if(this.storage.getItem('isAuthenticated')=="true"){
      return false;
    }else{
      return true;
    }
  }
  isAuthenticatedAsAdmin():Boolean{
    const a=this.getStatus();
    if(a=='admin'){

      //console.log("adminiiiiii")
      return true;
    }

    return false;
  }
  // isAuthenticatedAsUser():Boolean{
  //   const b=this.getStatus();
  //   console.log(b);
  //   if(b=="admin" || b=="user" ){
  //     console.log('finale')
  //     return true;
  //   }else{
  //   console.log(b);
  //   console.log('2');
  //   return false;}
  // }
}
