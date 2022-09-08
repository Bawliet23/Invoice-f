import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api :ApiService) { }


  addProduct(product:any){
    this.api.post("product",product);
  }
  getProducts(id:number,page:number){
    return new Promise(async (resolve,reject) => {
      this.api.get("user/"+id+"/products?page="+page).then(data=>resolve(data)).catch(err=>console.error(err))
    })
    
  }
  getProductsAsList(id:number){
    return new Promise(async (resolve,reject) => {
      this.api.get("user/"+id+"/productsL").then(data=>resolve(data)).catch(err=>console.error(err))
    })
    
  }
  delete(id:number){
      this.api.delete("product/"+id)
    }
  
  }

