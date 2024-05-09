import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category/category.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../services/cart/cart.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products:Product[] = []
  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if(params.get('category_id')){
        let id = Number(params.get('category_id'))
        this.categoryService.getProductByCategory(id).subscribe((products)=>{
          this.products =products;
        })
      }
    })
  }
  addToFavorite(product_id:number){
    this.cartService.addToCart(product_id).subscribe();
    window.alert("The food has been added to the favorites")
  }
}
