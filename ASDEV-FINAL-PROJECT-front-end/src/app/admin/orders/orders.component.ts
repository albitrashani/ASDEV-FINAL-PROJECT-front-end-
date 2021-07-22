import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(
    private router:Router,
    protected testService: TestService
  ) { }

  orders!: any[];
  displayedColumnsonmenu=['user','items','amount','status','asd'];

  resultsLength: number=0;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.testService.getAllOrders().subscribe((posts) => (
      this.orders = posts as any[],
      console.log(this.orders),
      this.resultsLength=this.orders.length,
      this.dataSource = new MatTableDataSource<any>(this.orders),
      this.dataSource.paginator = this.paginator,
      this.dataSource.sort = this.sort
));
  }

  updatestatus(id: any){
    console.log(id)
    this.testService.updateStatus(id).subscribe((posts) => {
      console.log(posts),
      window.alert('Status Changed!'),
      window.location.reload()
    },(err:HttpErrorResponse)=>{
      window.alert('Status already Changed!');
      return err;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
