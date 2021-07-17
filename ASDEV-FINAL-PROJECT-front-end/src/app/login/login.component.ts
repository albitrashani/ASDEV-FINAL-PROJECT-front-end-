import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignInData } from '../models/signInData';
import { TestService } from '../test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginInvalid = false;
  incorrectvalues = false;
  incorrectvalues2 = false;
  constructor(protected testService: TestService) {}

  ngOnInit(): void {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  forma = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit(): Promise<void> {
    const signInData = new SignInData(
      this.form.value.username,
      this.form.value.password
    );
    console.log(signInData);
    if (!this.form.valid) {
      this.loginInvalid = true;
      this.incorrectvalues = false;
      return;
    }
    this.checkCredentials(signInData);
    //console.log(this.form.value);
    //this.testService.signin(this.form.value)
  }

  private checkCredentials(a: SignInData) {

    this.testService.signin(a).subscribe((result: any) => {
      this.incorrectvalues = false;
      console.log(result.access_token);
      console.log(result.status);
    });
    this.incorrectvalues = true;
  }

  async onSubmit2(): Promise<void> {
    //console.log(this.forma);
    if (!this.forma.valid) {
      this.loginInvalid = true;
      this.incorrectvalues2 = false;
      return;
    }

    this.testService.createUser(this.forma.value).subscribe((result: any) => {
      if (result.message == 'this username already exists') {
        this.incorrectvalues2 = true;
      } else {
        this.incorrectvalues2 = false;
        console.log(result);
        window.alert('User has been registered!');

      }
    });
    //console.log(this.forma.value);
    //this.testService.signin(this.form.value)
  }
}
