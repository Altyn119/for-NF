import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category/category.service";
import {Category} from "../../models/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  logged:boolean = false;
  categories:Category[] = []
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.getCategories();
      this.logged = true;
    }
  }
  getCategories(){
    this.categoryService.getCategories().subscribe( (categories) => {
      this.categories =categories;
    });
  }
  constructor(private categoryService:CategoryService) {
  }

}
