import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { Product } from '../types';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'price', 'action'];
  dataSource:any;
  name:string="";
  price:number;
  page:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private auth:AuthService,private productService :ProductService) {
    this.productService.getProducts(this.auth.user.id,0).then((data:any)=>{
      this.page=data;
      this.dataSource=data.content;
      console.log("push me to the edge All my friend are dead ahhhhhhhhhhh")
      console.log(this.page)
    })
  }
  ngOnInit(): void {
      
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{name:this.name,price:this.price}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.productService.getProducts(this.auth.user.id, this.paginator.pageIndex).then((data:any)=>{
        this.page=data;
        this.dataSource=data.content;
      })
    });
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row,
    })
  }

  deleteProduct(id:number){
   this.productService.delete(id);
   this.dataSource=this.dataSource.filter(product=>product.id!==id)
  }

next(){
  console.log( this.paginator.pageIndex)
  this.productService.getProducts(this.auth.user.id, this.paginator.pageIndex).then((data:any)=>{
    this.page=data;
    this.dataSource=data.content;
  })
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}





