
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';//for api calling it  is used
import {Observable} from 'rxjs';
import {Accountinfo} from './accountinfo'
import {Userloginfo} from './userloginfo';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {
  url='http://localhost:3000/'
  constructor(private http:HttpClient) { }
  createaccount(accinfo:Accountinfo):Observable<Accountinfo>{
   
    return this.http.post<Accountinfo>(this.url+'api/register',accinfo)
  }
userLogin(logininfo: Userloginfo): Observable<{ msg: string; status: string }> {
  return this.http.post<{ msg: string; status: string }>(this.url + 'api/login', logininfo);
}


}
