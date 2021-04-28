import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private category!: string | undefined;
  categoryId!: number | undefined;
  private routeSub: Subscription;
  recipes: Recipe[] = [];
  categorySelection: any[] = [];
  searchText: string = '';

  constructor(route: ActivatedRoute,
              private recipesService: RecipesService,
              private router: Router) {
    this.categorySelection = recipesService.categoryFilterList;
    this.routeSub = route.params.subscribe(params => {
      this.category = params['name'];
      console.log(this.category);
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
        this.recipes = this.categoryId ? this.getRecipes(this.category) : this.allRecipes;
        console.log(this.recipes);
      }
    )
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getRecipes(category: string | undefined): Recipe[] {
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

  onCategoryChange(): void {
    this.category = this.recipesService.categoryFilterList.find((category: FilterCategory) => {
      return category.id == this.categoryId;
    })?.name;
    this.router.navigate(['/recipes/recipe-list/' + this.category]).then((res: Boolean) => {
      if (res)
      this.recipes = this.categoryId ? this.getRecipes(this.category) : this.allRecipes;
    });
  }

  onRecipeClick(recipe: Recipe) {
    this.router.navigateByUrl('/recipes/recipe/' + recipe.id, { state: { recipe: recipe } });
  }

}
