import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../../../models/Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  BASE_URL = "http://127.0.0.1:8000/api";
  constructor(private client:HttpClient) { }
  getCart(user_id:number):Observable<Cart>{
    return this.client.get<Cart>(`${this.BASE_URL}/cart/${user_id}`)
  }
  addToCart(product_id: number):Observable<Cart>{
    return this.client.post<Cart>(`${this.BASE_URL}/add-to-cart/${product_id}/`,{});
  }
  removeFromCart(product_id:number):Observable<any>{
    return this.client.delete<Cart>(`${this.BASE_URL}/remove-from-cart/${product_id}`)
  }
}
