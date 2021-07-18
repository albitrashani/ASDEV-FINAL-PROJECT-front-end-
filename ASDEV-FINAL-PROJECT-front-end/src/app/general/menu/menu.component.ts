import { Component, Input, OnInit} from '@angular/core';
import { TestService } from '../../services/test.service';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { ActivatedRoute, Router } from '@angular/router';
import { menu } from '../models/menu';
import { FormGroup } from '@angular/forms';
import { SignInData } from '../models/signInData';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  addedToBasket:boolean=false;
  menu: any[] = [];
  displayedColumnsonmenu = ['name', 'description', 'price', 'asd'];
  restaurantname: string = '';

  constructor(
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    protected testService: TestService,
    protected http: HttpClient,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (!params.name) {
        throw new Error('Name required');
      }
      this.http
        .get('http://localhost:3000/public/restaurant/menulist/' + params.name)
        .toPromise() as any;
      this.menu = (await this.testService
        .getRestaurantMenu(params.name)
        .toPromise()) as any;
      this.restaurantname = this.menu[0].restaurantname;
    });
  }
  orderonclick(name: string) {

    if (this.authenticationService.isAuthenticated) {
      this.testService.addorderi(name).subscribe((posts) => {
        this.menu = posts as any[];
        console.log(posts);
      }),
        (err: HttpErrorResponse) => {
          console.log(err);
        };
        window.alert(`The product has been added to basket!`);
    }else{
      window.alert('Please Log in to add to basket!');
      this.router.navigate(["login"])
    }

  }



}
