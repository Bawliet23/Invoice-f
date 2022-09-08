import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private authService:AuthService,private api :ApiService,private http:HttpClient) { }

  download(id:number){
    return new Promise(async (resolve, reject) => {
       let headers =new HttpHeaders({
        Authorization:"Bearer "+this.authService.user.jwt,
        Accept: "application/json */*"
      });
       this.api.get("invoice/"+id,{headers, responseType: 'blob'}).then((data:any)=>{
        let blob = new Blob([data], { type: 'application/pdf' });
      let pdfUrl = window.URL.createObjectURL(blob);

      var PDF_link = document.createElement('a');
      PDF_link.href = pdfUrl;
      // window.open(pdfUrl, '_blank');
      PDF_link.download = "invoice.pdf";
      PDF_link.click();
         resolve(data)
       })
       .catch(err=>reject(err));
   })
  
  
  }
  getInvoicesByUser(userId:number){
    return new Promise(async (resolve,reject) => {
      this.api.get("user/"+userId+"/invoices").then(data=>{
        resolve(data)
      })
    })
  }

  delete(id:number){
    return new Promise(async (resolve,reject) => {
      this.api.delete("invoice/"+id).then(()=>console.log("deleted"))
    })
  }
 

addInvoice(invoice,logo){
  var inv = JSON.stringify(invoice);
  const formData = new FormData();
  formData.append('logo', logo);
  formData.append('userid', this.authService.user.id.toString());
  formData.append('invoice', inv);

console.log(inv)
return new Promise(async (resolve,reject)=>{
  this.api.post("invoice",formData).then(data=>resolve(data)).catch(err=>console.error(err))

})

}


}
