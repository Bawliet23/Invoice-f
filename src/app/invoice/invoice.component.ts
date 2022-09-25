import { Component, Inject, Injectable, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { InvoiceService } from '../services/invoice.service';
import { FormArray } from '@angular/forms';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { A11yModule } from '@angular/cdk/a11y';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Invoice, Product, ProductInvoice } from '../types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {


  fileToUpload: File = null;
  invoiceList:any;
  listData:ProductInvoice[]=[{
    quantity:1,
    product:null

  }];
  url: any;
  msg = "";
prodsL:any;

  selectFile(event: any) {
    if(!event.target.file[0] || event.target.file[0].length == 0){
        this.msg = 'You must select an image';
        return;
    }

    let mimeType = event.target.file[0].type;

    if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        return;
    }

    let reader = new FileReader();

    reader.readAsDataURL(event.target.file[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }

  }

  download(){
    let invoice =this.invoiceForm.getRawValue()
    invoice.orderItems=this.listData;
       if(this.fileToUpload!=null)
       this.invoiceService.addInvoice(invoice,this.fileToUpload).then((data:Invoice)=>{
        console.log(data.id)
        this.invoiceService.download(data.id).then(()=>console.log("success")).catch(err=>console.log(err))

       })
       this.router.navigate(['/user'])
        }

// anytime the user clicks on add new row a new row should apear under the old one.

  addNewRow(){
    let pr = {    id:(this.listData.length+1),
      quantity:1,
      product:null
  
    }
    
this.listData.push(pr)
  }

  Reset(){
      this.listData=[{
        quantity:1,
        product:null
    
      }];
  }

quant($event,element:ProductInvoice){
  element.quantity=$event.target.value;
}





  ngOnInit(): void {

  }
  _dateAdapter!: DateAdapter<Date, any>;

  // invoiceForm = new FormGroup ({
  //   recipient: new FormControl('', Validators.required),
  //   reciever: new FormControl('', Validators.required),
  //   address: new FormControl(''),
  //   // start: new FormControl<Date | null>(null),
  //   // end: new FormControl<Date | null>(null),
  //   description: new FormControl(''),
  //   quantity: new FormControl(''),
  //   tot1: new FormControl(''),

  // });

  invoiceForm:  FormGroup;

  constructor(private fb:FormBuilder,private router :Router,private invoiceService :InvoiceService,private productService:ProductService,private auth :AuthService) {
    this.invoiceForm = this.fb.group ({
      name: ['',Validators.required],
      billTo: ['',Validators.required],
      shipTo: ['',Validators.required],
      paymentTerm: ['',Validators.required],
      date:[''],
      po:[''],
      dueDate:[''],
      note:[''],
      term:[''],
      tax:[''],
      amountPaid:[''],
    })

    this.productService.getProductsAsList(this.auth.user.id).then((data)=>{this.prodsL=data
    console.log(this.prodsL)
    console.log(data)
  })
  }

  selectProduct(pr:Product,element:ProductInvoice){
    element.product=pr;
    console.log(this.listData)
  }
save(){
 let invoice =this.invoiceForm.getRawValue()
 invoice.orderItems=this.listData;
    if(this.fileToUpload!=null)
    this.invoiceService.addInvoice(invoice,this.fileToUpload)
    this.router.navigate(['/user'])
}

  // invoiceForm = this.FormBuilder.group({
  //   description: ['',  Validators.required],
  //   quantity: [''],
  //   tot1: ['']
  // })




  // showPreview(event: { target: { files: string | any[]; }; }) {
  //   if(event.target.files.length > 0){
  //     let src = URL.createObjectURL(event.target.files[0]);
  //     let preview = document.getElementById("file-ip-1-preview") as HTMLImageElement ;
  //     preview.src = src;
  //     preview.style.display = "block";
  //   }
  // }









  prix = 0;
  input1= 1;
  somme = 0;
  tx = 0;
  redx = 0;
  livr = 0;
  montPayee = 0;

  subTotal(): number {
    let sub=0;
    if(this.listData.length===0)
    return sub;
    for (let i = 0; i < this.listData.length; i++) {
      if(this.listData[i].product!=null)
      sub += (this.listData[i].quantity*this.listData[i].product.price);

    }
    return sub;
  }

  montant(): number{
    let x:number = (this.subTotal()*this.tx)/100;
   return this.subTotal()+x;
  };

  sold(): number{
    const Tax = (this.somme)*(this.tx/100);
    const Redux = (this.somme)*(this.redx/100);
    let solution:number = (this.somme) - Redux  + Tax  + (this.livr);

    return solution;
  }
  total(){
      return this.montant()-this.montPayee;
  }

  // ngOnInit(): void {
  // }

  // handlePrint() {
  //   window.print();
  // }

  get recipient(){
    return this.invoiceForm.get('recipient');
  }

  get reciever(){
    return this.invoiceForm.get('reciever');
  }

  get address(){
    return this.invoiceForm.get('email');
  }

  get description(){
    return this.invoiceForm.get('description');
  }



  get tax(){
    return this.invoiceForm.get('tax');
  }

  get redux(){
    return this.invoiceForm.get('redux');
  }
  get date(){
    return this.invoiceForm.get('date');
  }


  get MontantPayee(){
    return this.invoiceForm.get('MontantPayee');
  }

  get remarque(){
    return this.invoiceForm.get('note');
  }

  get terms(){
    return this.invoiceForm.get('term');
  }



  handleFileInput(e) {
    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files[0];
    }
    
   
    
  
}

}



