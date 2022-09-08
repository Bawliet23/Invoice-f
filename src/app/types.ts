export interface User {
 id:number;
 name:string;
 email:string;
 products:Product[];
 invoices:Invoice[];
 jwt:string;
}


export interface Product{
    name:string;
    price:number;
}

export interface Invoice {
   
     id?: number;

     name: string;
     email:string;
     shipTo :string;
     billTo : string;
     po: string;
     date: Date;
     dueDate: Date;
     paymensTerm: string;
     currensy: string;
     logo?: string;

     subtotal: number;

     tax: number;

     total: number;

     amountPaid: number;

     balanceDue: number;

     note: string;

     term: string;

     orderItems?:ProductInvoice[];
}

export interface ProductInvoice{
    quantity:number;
    product:Product
}