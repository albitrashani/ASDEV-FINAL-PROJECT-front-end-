import { Component, Input, OnInit} from '@angular/core';
import { TestService } from '../test.service';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { ActivatedRoute } from '@angular/router';
import { menu } from '../models/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  menu: any[] = [];
  displayedColumnsonmenu = ['name', 'description','price','asd',];

  constructor(
    private route: ActivatedRoute,
    protected testService: TestService,
  ) { }

    ngOnInit(): void {

      this.route.params.subscribe(async params => {
        if (!params.name) {
          throw new Error('Name required');
        }

        this.menu = await this.testService.getRestaurantMenu(params.name).toPromise() as any;
      });
    }
    orderonclick(id:string){
      this.testService.addorderi().subscribe((posts) => {
        this.menu = posts as any[];
        console.log(posts);
      });

    }


}
