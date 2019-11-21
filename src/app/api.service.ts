import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL:string = 'https://conference1.geowebsite.net/wp-json/public-woo/v1/';

  constructor(public http: HttpClient) { 
    console.log('This is the Api Service');
   }

get(query:string = '') {
  return this.http.get(this.API_URL + query);
}

}
