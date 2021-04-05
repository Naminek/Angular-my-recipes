import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

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
    return (c: AbstractControl): {[key: string]: any} | null => {
        if (c.value.length >= min)
            return null;
        return {'minLengthArray': { valid: false }};
    }
  }
}
