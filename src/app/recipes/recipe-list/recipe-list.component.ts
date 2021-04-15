import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterCategory } from '../categories-filter/category.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private allRecipes: Recipe[] = [];
  private category!: string;
  private categoryId!: number| undefined;
  private routeSub: Subscription;
  recipes: Recipe[] = [];
  searchText: string = '';

  constructor(route: ActivatedRoute,
              private recipesService: RecipesService) {
    this.routeSub = route.params.subscribe(params => {
      this.category = params['name'];
      this.categoryId = this.recipesService.categoryFilterList.find((category: FilterCategory) => {
        return category.name == this.category;
      })?.id;
      // console.log(params);
      // this.categoryId = +params['categoryId']; // (+) converts string 'categoryId' to a number
   });
  }

  ngOnInit(): void {
    this.recipesService.recipesObservable.subscribe((res: Recipe[]) => {
        this.allRecipes = res;
        console.log(this.categoryId);
        this.recipes = this.category ? this.getRecipes(this.category) : this.allRecipes;
        console.log(this.recipes);
      }
    )
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getRecipes(category: string): Recipe[] {
    const recipes: Recipe[] = [];
      this.allRecipes.filter((recipe: Recipe) => {
        console.log(recipe);
        const selectedCategory = recipe.category.find(c => {
          return c.name == category;
        });
        if (selectedCategory?.value)
          recipes.push(recipe);
      });
    return recipes;
  }


}
