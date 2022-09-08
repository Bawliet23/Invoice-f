import { Component, OnInit } from '@angular/core';


import {  ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';








@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  // @ViewChild(MatTable,{static:true}) table: MatTable<any>;


  // constructor(public dialog: MatDialog,table: MatTable<any>) { }


  // openDialog(action,obj) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     width: '250px',
  //     data:obj
  //   });


  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result.event == 'Add'){
  //       this.addRowData(result.data);
  //     }else if(result.event == 'Update'){
  //       this.updateRowData(result.data);
  //     }else if(result.event == 'Delete'){
  //       this.deleteRowData(result.data);
  //     }
  //   });
  // }


  // addRowData(row_obj){
  //   var d = new Date();
  //   this.dataSource.push({
  //     id:d.getTime(),
  //     name:row_obj.name
  //   });
  //   this.table.renderRows();

  // }
  // updateRowData(row_obj){
  //   this.dataSource = this.dataSource.filter((value,key)=>{
  //     if(value.id == row_obj.id){
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }
  // deleteRowData(row_obj){
  //   this.dataSource = this.dataSource.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
  // }

  contactUsForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    content: new FormControl('',Validators.required),
  });

  get email() {
    return this.contactUsForm.get('email');
  }


  ngOnInit(): void {
  }

  Send() {

  }

}
