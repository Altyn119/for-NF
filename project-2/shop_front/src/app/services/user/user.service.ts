import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserId} from "../../../models/UserId";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = "http://127.0.0.1:8000/api";
  constructor(private client : HttpClient) { }
  get_id():Observable<UserId>{
    return this.client.get<UserId>(`${this.BASE_URL}/user_id/`)
  }
}
