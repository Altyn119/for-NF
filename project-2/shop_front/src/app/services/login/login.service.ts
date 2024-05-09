import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JWT_token} from "../../../models/JWT_token";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = "http://127.0.0.1:8000/api";
  constructor(private client : HttpClient){ }

  login(username:string, password:string):Observable<JWT_token>{
    return this.client.post<JWT_token>(`${this.BASE_URL}/login/`, {username, password})
  }
}
