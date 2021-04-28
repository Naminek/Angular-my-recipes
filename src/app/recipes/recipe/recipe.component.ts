import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {
  private recipe!: Recipe;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(res => {
        this.recipe = res.recipe;
        console.log(this.recipe);
      })
  }

  ngOnInit(): void {
  }

}
