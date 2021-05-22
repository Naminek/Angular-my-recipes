import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Ingredients, Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe: Recipe | undefined;
  allRecipes: Recipe[] = [];
  recipeId!: number;

  constructor(private activatedRoute: ActivatedRoute,
              private recipesService: RecipesService,
              private router: Router) {
    this.recipesService.recipesObservable.subscribe((res: Recipe[]) => {
      this.allRecipes = res;
      this.updateRecipe();
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes('/recipes/recipe/')) {
          this.recipeId = this.activatedRoute.snapshot.params.id;
          this.updateRecipe();
        }
      }
    });
    this.recipesService.toggleFilterHeaderVisiblity(false);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.recipesService.toggleFilterHeaderVisiblity(true);
  }

  getIngredientsSymbol(ingredients: Ingredients): string | undefined {
    if (!ingredients.additional)
      return '';
    const additional = this.recipesService.ingredientsAdditionalOptions.find(item => {
      return item.value == ingredients.additional;
    });
    return additional?.symbol;
  }

  updateRecipe():void {
    if (!this.recipeId)
      return;
    this.recipe = this.allRecipes.find((recipe: Recipe) => {
      return recipe.id == this.recipeId;
    });
  }

}
