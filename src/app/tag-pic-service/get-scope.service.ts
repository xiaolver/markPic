import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class GetScopeService {

  constructor(
    private http:HttpClient
  ) { } 
  getScope(crane:string,lane:string)
  {
    //装配crane lane
    var url="http://192.168.1.177:8080/scope/get?crane=2";
    url='http://10.2.4.52:30011/scope/get/lane?crane=1&lane=1';
    var info=null;
    return this.http.get(url);

  }
  
}
