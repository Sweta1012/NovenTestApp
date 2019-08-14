import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http: HttpClient) { }

  apiUrl  = "http://jsonplaceholder.typicode.com/";

  /*Get All users form Api*/
	getUsers(){
		let url = this.apiUrl + "users";
		return this._http.get(url);
	}

	/*Get All users Details*/
	getUserDetails(){
		let url = this.apiUrl + "todos";
		return this._http.get(url);
	}
}
