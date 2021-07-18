import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignInData } from '../models/signInData';
import { AuthenticationService } from '../../services/authentication.service';
import { TestService } from '../../services/test.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginInvalid = false;
    incorrectvalues = false;
    alb:number | undefined;


  constructor(
    private AuthenticationService:AuthenticationService,
    protected testService: TestService,
    private router:Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {}



  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });



  async onSubmit(): Promise<void> {
    const signInData = new SignInData(
      this.form.value.username,
      this.form.value.password
    );
    //console.log(signInData);
    if (!this.form.valid) {
      this.loginInvalid = true;
      this.incorrectvalues = false;
      console.log('invalid');
      return;

    }
    this.checkCredentials(signInData);

    //console.log(this.form.value);
    //this.testService.signin(this.form.value)
  }

  private checkCredentials(a: SignInData) {

    this.testService.signin(a).subscribe((result: any) => {
      this.incorrectvalues = false;
      //console.log(a.getusername());
      console.log(this.form.value.username);
      console.log(result.access_token);
      console.log(result.status);
      this.AuthenticationService.storedata(this.form.value.username,result.access_token,result.status,true);
      this.router.navigate(['restaurant']);
      //localStorage.setItem()
    },(err:HttpErrorResponse)=>{
      this.incorrectvalues = true;
      //console.log(err)
    });

  }



}
