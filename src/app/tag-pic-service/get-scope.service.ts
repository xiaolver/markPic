import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetScopeService {

  constructor(
    private http: HttpClient
  ) { }
  getScope(crane: string, lane: string)
  {
    // 装配crane lane
    let url ;
    url = 'http://10.2.4.52:30011/scope/get/lane?crane='+crane+'&lane='+lane;
    return this.http.get(url);

  }

}
