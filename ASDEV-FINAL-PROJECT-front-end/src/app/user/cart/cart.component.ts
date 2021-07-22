import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(protected testService: TestService) { }


  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }
  dataSource!: MatTableDataSource<any>;
  resultsLength=0;

  cart!: any[];
  cart1!: any[];

  displayedColumnsonmenu=['name','qty','price','asd'];
  us: string = '';
  cartTotal: number=0;
  noitems:boolean=false;
  ngOnInit(): void {
      this.testService.getCart().subscribe((posts) => (
       //console.log(posts),
       this.cart1 = posts as any[],
       this.cart= this.cart1[0].items,
       console.log(this.cart),
       this.us=this.cart1[0].user,
       this.getTotalCost(),
       this.noitems=true,
       this.resultsLength=this.cart.length,
      this.dataSource = new MatTableDataSource<any>(this.cart)

        ));



  }

  getTotalCost(){
    this.cartTotal = 0
    this.cart.forEach(item => {
      this.cartTotal += (item.qty * item.price)
  })
  }
  //Add order and delete cart
  submitorder(items:any,total:any){
    this.testService.addorderi(items,total).subscribe();
    this.testService.deleteCart().subscribe((posts) => (
      console.log(posts),
    console.log('cdel')
    ));
    window.location.reload();
    window.alert("Order is made!");
  }

  deleteItem(name:string){
    console.log(name);
    this.testService.deleteCartIem(name).subscribe();
    window.alert('Items deleted');
    window.location.reload();
  }
}
