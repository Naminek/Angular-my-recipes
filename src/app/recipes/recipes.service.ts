import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesObservable: Observable<any[]>;
  ingredientsAdditionalOptions = [
    {symbol: String.fromCharCode(8212), value: 0, name: 'none'},
    {symbol: String.fromCharCode(9824), value: 2, name: 'spade'},
    {symbol: String.fromCharCode(9827), value: 3, name: 'club'},
    {symbol: String.fromCharCode(9829), value: 4, name: 'heart'},
    {symbol: String.fromCharCode(9830), value: 5, name: 'diamond'}
  ];
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.recipesObservable = db.list('/recipes', ref => ref.orderByChild('id')).valueChanges(); // change order of the list by recipe id
  }

  addRecipe(data: any) {
    return this.db.list('/recipes').push(data);
  }

}

