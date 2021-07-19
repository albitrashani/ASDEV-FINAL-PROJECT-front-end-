import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit  {

  addedToBasket:boolean=false;
  menu: any[] = [];
  displayedColumnsonmenu = ['name', 'description', 'price', 'asd'];
  restaurantname: string = '';
  resultsLength=0;
  dataSource!: MatTableDataSource<any>;
  constructor(
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    protected testService: TestService,
    protected http: HttpClient,
    private router:Router
  ) {

  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (!params.name) {
        throw new Error('Name required');
      }
      //this.http.get('http://localhost:3000/public/restaurant/menulist/' + params.name).toPromise() as any;
      this.menu = (await this.testService.getRestaurantMenu(params.name).toPromise()) as any;

      this.restaurantname = this.menu[0].restaurantname;
      //console.log(this.menu)
      this.resultsLength=this.menu.length;
      this.dataSource = new MatTableDataSource<any>(this.menu);
      //console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  orderonclick(name: any) {

    if (this.authenticationService.getIsAuthenticated()) {
      this.testService.addtoCart(name).subscribe((posts) => {
        this.menu = posts as any[];

      }),
        (err: HttpErrorResponse) => {
          console.log(err);
        };
        window.alert(`The product has been added to Cart!`);
    }else{
      window.alert('Please Log in to add to Cart!');
      this.router.navigate(["login"])
    }

  }



}

