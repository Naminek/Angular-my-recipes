import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private id!: number;
  private routeSub: Subscription;
  private allRecipes: Recipe[] = [];
  recipes: Recipe[] = [];
  private categories = [
    {id: 1, value: 'meat'},
    {id: 2, value: 'seafood'},
    {id: 3, value: 'vegetaarian'},
    {id: 4, value: 'vegan'},
    {id: 5, value: 'sweets'}
  ]

  constructor(route: ActivatedRoute,
              private recipesService: RecipesService) {
    this.routeSub = route.params.subscribe(params => {
      console.log(params);
      this.id = +params['id']; // (+) converts string 'id' to a number
   });
  }

  ngOnInit(): void {
    this.recipesService.recipesObservable.subscribe((res: Recipe[]) => {
        this.allRecipes = res;
        console.log(this.id);
        this.recipes = this.id ? this.getRecipes(this.id) : this.allRecipes;
        console.log(this.recipes);
      }
    )
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getRecipes(id: number): Recipe[] {
    const recipes: Recipe[] = [];
      this.allRecipes.filter((recipe: Recipe) => {
        console.log(recipe);
        const selectedCategory = recipe.category.find(c => {
          return c.id == id;
        });
        if (selectedCategory?.value)
          recipes.push(recipe);
      });
    return recipes;
  }


}
