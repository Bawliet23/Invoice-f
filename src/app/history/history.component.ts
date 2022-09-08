import { Component, OnInit } from '@angular/core';
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
  constructor(private invoiceService:InvoiceService,private auth:AuthService) {
    invoiceService.getInvoicesByUser(auth.user.id).then((data:Invoice[])=>this.invoices=data)
   }

  ngOnInit(): void {
  }

 delete(id:number){
  this.invoiceService.delete(id);
  this.invoices=this.invoices.filter(invoice=>invoice.id!==id)
 }


 download(id:number){
  this.invoiceService.download(id);
 }
}
