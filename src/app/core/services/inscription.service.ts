import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  constructor(public http:HttpClient) {  
  }
  public url():string { 
    return environment.apiUrl+'inscriptions';
  }
  public getBaseUrl():string {
      return environment.apiUrl;
  }
  public getAll():Observable<any> {
    return this.http.get<any>(this.url());
  }
  public get(id:number):Observable<any> {
    return this.http.get<any>(this.url()+'/'+id);
  }
  public create(data:any):Observable<any> {
    return this.http.post<any>(this.url(),data);
  }
  public update(id:number,data:any):Observable<any> {
    return this.http.put<any>(this.url()+'/'+id,data);
  }
  public delete(id:number):Observable<any> {
    return this.http.delete<any>(this.url()+'/'+id);
  }
}
