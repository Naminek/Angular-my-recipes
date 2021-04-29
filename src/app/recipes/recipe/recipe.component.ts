import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit, OnDestroy {
  private recipe!: Recipe;

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

}
