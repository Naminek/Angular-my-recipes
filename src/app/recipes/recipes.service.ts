import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { FilterCategory } from './categories-filter/category.model';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  categoryFilterList: FilterCategory[] = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Meat'},
    {id: 2, name: 'Seafood'},
    {id: 3, name: 'Vegetarian'},
    {id: 4, name: 'Vegan'},
    {id: 5, name: 'Sweets'}
  ]
  ingredientsAdditionalOptions = [
    {symbol: String.fromCharCode(8212), value: 0, name: 'none'},
    {symbol: String.fromCharCode(9824), value: 1, name: 'spade'},
    {symbol: String.fromCharCode(9827), value: 2, name: 'club'},
    {symbol: String.fromCharCode(9829), value: 3, name: 'heart'},
    {symbol: String.fromCharCode(9830), value: 4, name: 'diamond'}
  ];
  recipesObservable: Observable<any[]>;
  filterHeaderVisiblityChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.recipesObservable = db.list('/recipes', ref => ref.orderByChild('id')).valueChanges(); // change order of the list by recipe id
  }

  addRecipe(data: any) {
    return this.db.list('/recipes').push(data);
  }

  toggleFilterHeaderVisiblity(value: boolean) {
    this.filterHeaderVisiblityChanged.next(value);
  }

}

