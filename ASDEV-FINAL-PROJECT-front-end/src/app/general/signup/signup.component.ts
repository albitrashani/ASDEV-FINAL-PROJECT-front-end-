import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  incorrectvalues2 = false;
  alb=1;
  constructor(
    protected testService: TestService,
    private router:Router
    ) {}

  forma = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(4)]),
    username: new FormControl('', [Validators.required,]),
  });

  ngOnInit(): void {
    this.alb=1;
  }


  async onSubmit2(): Promise<void> {
    //console.log(this.forma);
    if (!this.forma.valid) {
      this.incorrectvalues2 = false;
      return;
    }

    this.testService.createUser(this.forma.value).subscribe((result: any) => {
      if (result.message == 'this username already exists') {
        this.incorrectvalues2 = true;
      } else {
        this.incorrectvalues2 = false;
        console.log(result);
        //
        this.router.navigate(['login']);
        window.location.reload();
        window.alert("User has been registered! \nPlease log in to continue!");

        this.forma.reset();
        //this.router.navigate(["/login"]);


      }
    });
    //console.log(this.forma.value);
    //this.testService.signin(this.form.value)
  }

}
