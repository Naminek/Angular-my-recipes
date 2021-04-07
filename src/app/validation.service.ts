import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Ingredients } from './recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  amountRequired() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      console.log(control);
      if (control.value.name != '' && control.value.amount == '')
        return {'emptyAmount': true};
      return null;
    }
  }

  emptyIngredientsNotAllowed() {
    return (array: AbstractControl): {[key: string]: any} | null => {
      console.log(array);
      const validGroup = array.value.find((i: Ingredients) => {
        return i.name != '' && i.amount !='';
      })
      if (validGroup)
        return null;
      return {'invalidIngredients': true }
    }
  }

  minSelectionObject(min: number) {
    return (group: FormGroup): {[key: string]: any} | null => {
      const selected = Object.values(group.value).filter(value => {
        return value;
      });
      if (selected.length >= min)
        return null;
      return {'selected': false };
    };
  }

  minLengthArray(min: number) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      console.log(control)
        if (control.value.length >= min)
            return null;
        return {'minLengthArray': { valid: false }};
    }
  }
}
