import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './recipes/recipe.model';

@Pipe({ name: 'recipeTitleFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {Recipe[]} recipes
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(recipes: Recipe[], searchText: string): any[] {
    if (!recipes) {
      return [];
    }
    if (!searchText) {
      return recipes;
    }
    searchText = searchText.toLocaleLowerCase();

    return recipes.filter((recipe: Recipe) => {
      return recipe.title.toLocaleLowerCase().includes(searchText);
    });
  }
}
