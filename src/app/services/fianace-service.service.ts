import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FianaceServiceService {

  constructor(private http:HttpClient) { }
  URL ='https://localhost:7146/';


  create (route:string,data:any):Observable<any>  {
    return this.http.post(this.createCompleteRoute(route,this.URL),data);
  }
  getData(route:string):Observable<any>{
    return this.http.get(this.createCompleteRoute(route,this.URL));
  }
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}${route}`;
  }
}
