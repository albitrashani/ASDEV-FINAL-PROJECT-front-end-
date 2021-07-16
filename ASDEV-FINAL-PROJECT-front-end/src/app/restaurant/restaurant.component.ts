import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { TestService } from '../test.service';

export interface RestauranElement {
  name: string;
  address: string;
  rating: string;
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  restaurants!: any[];
  menu!: any[];
  getMenu!: any[];
  displayedColumns = ['name', 'address', 'rating'];
  clickedRows = new Set<RestauranElement>();

  menuja = 'Albi';
  constructor(protected testService: TestService) {}

  ngOnInit(): void {
    this.testService.getRestaurants().subscribe(
      //posts => console.log(posts),
      (posts) => (this.restaurants = posts as any[])
    );
  }
  onRestaurantClick(name: string) {
    this.testService.getRestaurantMenu(name).subscribe((posts) => {
      this.menu = posts as any[];
      console.log(posts);
    });
  }
}
