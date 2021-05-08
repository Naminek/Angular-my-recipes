import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Ingredients, Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe!: Recipe;

  constructor(private activatedRoute: ActivatedRoute,
              private recipesService: RecipesService) {
    this.recipesService.toggleFilterHeaderVisiblity(false);
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(res => {
        this.recipe = res.recipe;
        console.log(this.recipe);
      });
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
    console.log(additional?.symbol);
    return additional?.symbol;
  }

}
