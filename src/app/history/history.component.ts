import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../services/auth.service';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../types';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  invoices:Invoice[]=[];

  displayedColumns: string[] = ['InvoiceName', 'Date', 'Action'];
  dataSource:any;
  name:string="";
  price:number;
  page:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private invoiceService:InvoiceService,private auth:AuthService) {
    invoiceService.getInvoicesByUserP(auth.user.id,0).then((data:any)=>{
      this.page=data;
      this.dataSource=data.content;
      this.invoices=data
      console.log("push me to the edge All my friend are dead ahhhhhhhhhhh")
      console.log(this.page)
    })
   }

  ngOnInit(): void {
  }

 delete(id:number){
  this.invoiceService.delete(id);
  this.dataSource=this.dataSource.filter(invoice=>invoice.id!==id)
 }


 download(id:number){
  this.invoiceService.download(id);
 }

 next(){
  console.log( this.paginator.pageIndex)
  this.invoiceService.getInvoicesByUserP(this.auth.user.id, this.paginator.pageIndex).then((data:any)=>{
    this.page=data;
    this.dataSource=data.content;
  })
}
}
