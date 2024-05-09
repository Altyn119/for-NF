import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../../models/Category";
import {Product} from "../../../models/Product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private client : HttpClient) { }
  BASE_URL = "http://127.0.0.1:8000/api";

  getCategories():Observable<Category[]>{
    return this.client.get<Category[]>(`${this.BASE_URL}/categories`);
  }
  getCategory(category_id:number):Observable<Category>{
    return this.client.get<Category>(`${this.BASE_URL}/categories/${category_id}/`)
  }

  getProductByCategory(category_id:number):Observable<Product[]>{
    return this.client.get<Product[]>(`${this.BASE_URL}/categories/${category_id}/products`);
  }
  getProducts():Observable<Product[]>{
    return this.client.get<Product[]>(`${this.BASE_URL}/products`)
  }
}
