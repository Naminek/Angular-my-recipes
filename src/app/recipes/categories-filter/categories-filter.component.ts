import { Component, OnInit } from '@angular/core';

import { Category } from './category.model';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.less']
})
export class CategoriesFilterComponent implements OnInit {
  categories: Category[] = [
    { id: 0, name: 'All', image: '../../../assets/all2.jpg' },
    { id: 1, name: 'Meat', image: '../../../assets/meat.jpg'},
    { id: 2, name: 'Seafood', image: '../../../assets/fish.jpg'},
    { id: 3, name: 'Vegetarian', image: '../../../assets/vegetarian.jpg'},
    { id: 4, name: 'Vegan', image: '../../../assets/vegan.jpg'},
    { id: 5, name: 'Sweets', image: '../../../assets/sweets.jpg'},
  ];
  // recipes: Recipe[] = [];

  constructor(recipesService: RecipesService) {
    // recipesService.recipesObservable.subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     this.recipes = res;
    //   }
    // )
  }

  ngOnInit(): void {
    const date = new Date();
    const time = date.getTime()
    console.log(date)
    console.log(time)
    console.log(new Date(time))
  }

  onCategoryClick(category: Category) {
    console.log(category.id);
  }

}
