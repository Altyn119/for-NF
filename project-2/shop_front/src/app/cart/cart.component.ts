import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category/category.service";
import {UserService} from "../services/user/user.service";
import {CartService} from "../services/cart/cart.service";
import {Cart} from "../../models/Cart";
import {Product} from "../../models/Product";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private cartService:CartService, private userService: UserService,
              private categoryService:CategoryService) {}

  cart!:Cart;
  cartProducts: Product []= [];
  productsId: number [] = [];
  user_id!:number;
  logged: boolean = false;
  ngOnInit() {
    const token =  localStorage.getItem('token')
    if(token) {
      this.getProducts();
      this.userService.get_id().subscribe((data) => {
        this.user_id = data.user_id
        if (this.user_id) {
          this.getCart();
        }
      })
      this.logged = true
    }
  }
  getCart(){
    this.cartService.getCart(this.user_id).subscribe((data) => {
      this.cart = data;
      this.productsId = this.cart.products;
      this.cartProducts = this.cartProducts.filter((food) => this.productsId.includes(food.id))

    })
  }

  
  getProducts(){
    this.categoryService.getProducts().subscribe((product) => {
      this.cartProducts = product
    })
  }
  remove(product_id:number){
    this.cartService.removeFromCart(product_id).subscribe((data) =>{
      this.cartProducts = this.cartProducts.filter((product) => product.id!== product_id);
    })
  }




  


}
