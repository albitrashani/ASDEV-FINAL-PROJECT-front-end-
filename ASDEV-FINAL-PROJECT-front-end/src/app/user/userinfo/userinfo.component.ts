import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(
    protected testService: TestService
  ) { }
  useri!: any[];
  noorder:boolean= false
  userorder!: any;
  userorder1!: any;
  x!:any;

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
    this.dataSource3.paginator = this.paginator;
    this.dataSource3.sort = this.sort;


  }
  dataSource3!: MatTableDataSource<any>;
  resultsLength3=0;

  displayedColumns=['ID','items','status']

  ngOnInit(): void {
    this.testService.getUser().subscribe((posts) => (this.useri = posts as any[]));
    this.testService.getOrderFromUser().subscribe((posts) => (
      this.userorder = posts as any,
      console.log(this.userorder),
      this.oders(this.userorder),
      console.log(this.userorder.length),
    this.resultsLength3=this.userorder.length,
    this.dataSource3 = new MatTableDataSource<any>(this.userorder),
    console.log(this.dataSource3)


      ));

  }

  oders(x:any){
    if(x=='No orders'){
      this.userorder1=[];
      console.log(this.userorder1);
      this.noorder=false;
    }else{
      this.userorder1=x;
      this.noorder=true;

    }

  }

}
