import { HttpErrorResponse } from '@angular/common/http';
import { Component,  OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from '../../services/test.service';


export interface RestauranElement {
  name: string;
  address: string;
  rating: string;
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})


export class RestaurantComponent implements OnInit {



  restaurants!: any[];
  menu!: any[];
  getMenu!:any[];
  displayedColumns = ['name', 'address','rating'];
  clickedRows = new Set<RestauranElement>();
  resultsLength = 0;
  menuja='Albi';
  dataSource1!: MatTableDataSource<any>;
  constructor(
    protected testService: TestService
  ) {}

  @ViewChild(MatPaginator) paginator1!: MatPaginator

  async ngOnInit(): Promise<void> {
    this.restaurants=(await this.testService.getRestaurants().toPromise()) as any;
      this.resultsLength=this.restaurants.length,

      //console.log(this.restaurants),
      this.dataSource1 = new MatTableDataSource<any>(this.restaurants);
      //console.log(this.dataSource1)
      this.dataSource1.paginator = this.paginator1;



  }



  onRestaurantClick(name: string){
    this.testService.getRestaurantMenu(name).subscribe(
      posts => {this.menu=posts as any[];
      //console.log(posts)
    },(err:HttpErrorResponse)=>{
      return err;
    }
    );
  }




}






